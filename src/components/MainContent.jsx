import { Divider, Grid, Stack } from "@mui/material";
import Prayer from "./Prayer";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
moment.locale("LL");
import "animate.css";

const MainContent = () => {
  // STATES
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  // const [timings, setTimings] = useState({
  //   Fajr: "04:20",
  //   Dhuhr: "11:50",
  //   Asr: "15:18",
  //   Sunset: "18:03",
  //   Isha: "19:33",
  // });

  const [timings, setTimings] = useState(null);

  const [remainingTime, setRemainingTime] = useState("");

  // const [selectedCity, setSelectedCity] = useState({
  //   displayName: "القاهرة",
  //   apiName: "Cairo",
  // });

  const [today, setToday] = useState("");

  // const avilableCities = [
  //   {
  //     displayName: "القاهرة",
  //     apiName: "Cairo",
  //   },
  //   {
  //     displayName: "الإسكندرية",
  //     apiName: "Alexandria",
  //   },
  //   {
  //     displayName: "أسوان",
  //     apiName: "Aswan",
  //   },
  // ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const getTimings = async () => {
    const response = await axios.get(
      // `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=Cairo`
    );

    setTimings(response.data.data.timings);
  };

  useEffect(() => {
    getTimings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }
    console.log(remainingTime);

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
    console.log(
      "duration issss ",
      durationRemainingTime.hours(),
      durationRemainingTime.minutes(),
      durationRemainingTime.seconds()
    );
  };

  // const handleCityChange = (event) => {
  //   const cityObject = avilableCities.find((city) => {
  //     return city.apiName == event.target.value;
  //   });
  //   console.log("the new value is ", event.target.value);
  //   setSelectedCity(cityObject);
  // };

  return (
    <div>
      {/* TOP ROW */}
      <Grid
        container
        className=" animate__animated animate__fadeInDown animate__delay-2s"
      >
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            {/* <h1>{selectedCity.displayName}</h1> */}
            <h2>القاهرة</h2>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      {/* TOP ROW */}

      <Divider style={{ borderColor: "white", opacity: "0.1" }} />

      {/* PRAYERS CARDS */}
      {timings ? (
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          style={{ marginTop: "50px" }}
          className="cardWrapper animate__animated animate__fadeInUp animate__delay-1s"
        >
          <Prayer
            img={
              "https://res.cloudinary.com/dsj56djsq/image/upload/v1707865343/Prayer%20Times%20Imgages/fajr-prayer_umpywl.png"
            }
            name={"الفجر"}
            time={timings.Fajr}
          />
          <Prayer
            img={
              "https://res.cloudinary.com/dsj56djsq/image/upload/v1707865341/Prayer%20Times%20Imgages/dhhr-prayer-mosque_if1dqo.png"
            }
            name={"الظهر"}
            time={timings.Dhuhr}
          />

          <Prayer
            img={
              "https://res.cloudinary.com/dsj56djsq/image/upload/v1707865340/Prayer%20Times%20Imgages/asr-prayer-mosque_jlbc2d.png"
            }
            name={"العصر"}
            time={timings.Asr}
          />

          <Prayer
            img={
              "https://res.cloudinary.com/dsj56djsq/image/upload/v1707865340/Prayer%20Times%20Imgages/sunset-prayer-mosque_r5o8dn.png"
            }
            name={"المغرب"}
            time={timings.Maghrib}
          />

          <Prayer
            img={
              "https://res.cloudinary.com/dsj56djsq/image/upload/v1707865341/Prayer%20Times%20Imgages/night-prayer-mosque_mzij8e.png"
            }
            name={"العشاء"}
            time={timings.Isha}
          />
        </Stack>
      ) : (
        <h2>رجاء الانتظار...</h2>
      )}

      {/* PRAYERS CARDS */}

      {/* SELECT CITY */}
      {/* <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
      <FormControl style={{ width: "20%" }}>
					<InputLabel id="demo-simple-select-label">
						<span style={{ color: "white" }}>المدينة</span>
					</InputLabel>
					<Select
						style={{ color: "white" }}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						// value={age}
						label="Age"
						onChange={handleCityChange}
					>
						{avilableCities.map((city) => {
							return (
								<MenuItem
									value={city.apiName}
									key={city.apiName}
								>
									{city.displayName}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
      </Stack> */}
      {/* SELECT CITY */}
    </div>
  );
};

export default MainContent;
