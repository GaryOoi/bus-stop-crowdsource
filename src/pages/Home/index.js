import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner } from "react-bootstrap";

import {
  getBusstopsRequest,
  getBusstopsSuccess,
  getBusstopsFail,
} from "actions/busstopActions";
import {
  getBusstops,
  getBusstopsLoading,
  getBusstopsError,
} from "selectors/busstopSelectors";

import MessageModal from "components/MessageModal";
import { getData } from "utils/request";
import BusCard from "components/BusCard";
import { Section, SectionHeader, SpinnerWrapper } from "./styles";

function Home() {
  const dispatch = useDispatch();
  const busStops = useSelector(getBusstops);
  const busstopsLoading = useSelector(getBusstopsLoading);
  const busstopsError = useSelector(getBusstopsError);
  const [modelData, setModelData] = useState({
    visibility: false,
    message: "",
  });

  const handlePressModal = () => {
    setModelData({
      ...modelData,
      visibility: !modelData.visibility,
    });
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        dispatch(getBusstopsRequest());
        const result = await getData("busstops");
        dispatch(getBusstopsSuccess(result));
      } catch (err) {
        dispatch(getBusstopsFail(err));
        setModelData({
          visibility: true,
          message: err,
        });
      }
    };
    if (busStops.length < 1) {
      fetchAPI();
    }
  }, [busStops.length, dispatch]);

  return (
    <>
      <Section>
        {busstopsLoading || busstopsError !== "" ? (
          <SpinnerWrapper>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </SpinnerWrapper>
        ) : (
          <Container>
            <SectionHeader className="mb-5">All Bus Stops</SectionHeader>
            {busStops.map((busstop) => {
              return <BusCard key={busstop.id} busstop={busstop} />;
            })}
          </Container>
        )}
      </Section>
      <MessageModal modelData={modelData} onClick={handlePressModal} />
    </>
  );
}

export default Home;
