import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner } from "react-bootstrap";

import {
  getBusStopsRequest,
  getBusStopsSuccess,
  getBusStopsFail,
} from "actions/busStopActions";
import {
  getBusStops,
  getBusStopsLoading,
  getBusStopsError,
} from "selectors/busStopSelectors";

import MessageModal from "components/MessageModal";
import { getData } from "utils/request";
import BusCard from "components/BusCard";
import { Section, SectionHeader, SpinnerWrapper } from "./styles";

function Home() {
  const dispatch = useDispatch();
  const busStops = useSelector(getBusStops);
  const busStopsLoading = useSelector(getBusStopsLoading);
  const busStopsError = useSelector(getBusStopsError);
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
        dispatch(getBusStopsRequest());
        const result = await getData("busStops");
        dispatch(getBusStopsSuccess(result));
      } catch (err) {
        dispatch(getBusStopsFail(err));
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
        {busStopsLoading || busStopsError !== "" ? (
          <SpinnerWrapper>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </SpinnerWrapper>
        ) : (
          <Container>
            <SectionHeader className="mb-5">All Bus Stops</SectionHeader>
            {busStops.map((busStop) => {
              return <BusCard key={busStop.id} busStop={busStop} />;
            })}
          </Container>
        )}
      </Section>
      <MessageModal modelData={modelData} onClick={handlePressModal} />
    </>
  );
}

export default Home;
