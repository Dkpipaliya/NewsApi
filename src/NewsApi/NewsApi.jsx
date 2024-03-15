import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./Newsapi.css";
import { IoSearch } from "react-icons/io5";
import { ShimmerButton, ShimmerThumbnail } from "react-shimmer-effects";

function NewsApi() {
  const [data, setData] = useState([]);
  const [contry, setContry] = useState("");
  const [catag, setCatag] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const dataLoadRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=us&category=sport&apiKey=6f8ddc5fc0f240ab96cd6d466df86e9e"
        )
        .then((res) => {
          setLoading(false); // Set loading to false when data is fetched
          dataLoadRef.current.style.display = "none";
          console.log(res);
          setData(res.data.articles);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  }, []);

  const Addhandler = () => {
    setLoading(true); // Set loading to true when fetching new data
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${contry}&category=${catag}&apiKey=6f8ddc5fc0f240ab96cd6d466df86e9e`
      )
      .then((res) => {
        setLoading(false); // Set loading to false when data is fetched
        console.log(res);
        setData(res.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>

      {/* //////////////////////////////////////Navbar/////////////////////////////// */}

      <div className="Choise Type flex justify-center items-center">
        <h1 className="text-4xl ml-5 mt-2 mb-4">Select Category</h1>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <label htmlFor="" className="">
            Country
          </label>
          <select
            className="px-20 py-1 rounded-2xl ml-2 mr-3"
            name=""
            id=""
            value={contry}
            onChange={(evt) => setContry(evt.target.value)}
          >
            <option value="Us">US</option>
            <option value="in">India</option>
          </select>

          <label htmlFor="">Category</label>
          <select
            className="px-20 py-1 rounded-2xl ml-2"
            name=""
            id=""
            value={catag}
            onChange={(evt) => setCatag(evt.target.value)}
          >
            <option value="sport">Sport</option>
            <option value="business">Business</option>
          </select>
          <button className="btn btn-primary ml-8" onClick={Addhandler}>
            <IoSearch />
          </button>
        </div>

        {/* //////////////////////Slider//////////////////////////////////// */}

        <div ref={dataLoadRef}>
          {loading && <ShimmerThumbnail height={300} rounded />} {/* Shimmer effect for loading state */}
        </div>

        {data.slice(0, 1).map((el, index) => {
          return (
            <div
              key={index}
              id={`carouselExampleIndicators${index}`}
              className="carousel slide mt-10"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {data.slice(0, 3).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-bs-target={`#carouselExampleIndicators${index}`}
                    data-bs-slide-to={i}
                    className={i === 0 ? "active" : ""}
                    aria-current={i === 0 ? "true" : undefined}
                    aria-label={`Slide ${i + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                {data.slice(0, 3).map((el, i) => (
                  <div
                    key={i}
                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                  >
                    <img
                      src={el.urlToImage}
                      className="d-block w-[100%] h-[600px] object-center"
                      alt={`Slide ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselExampleIndicators${index}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carouselExampleIndicators${index}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* //////////////////////////////////////Title///////////////////// */}
      <div className="text-[45px] font-bold ml-32 mt-10">
        <h1>Latest News</h1>
      </div>
      {/* ////////////////////MainBord//////////////////////////////////////////////// */}

      <div className="flex flex-wrap  justify-start items-start mt-10 container">
        {loading ? ( // Shimmer effect for loading state
          Array.from({ length: 20 }).map((_, index) => (
            <ShimmerThumbnail className="rounded-2xl ml-10" key={index} height={300}  width={350}  />
          ))
        ) : (
          data.map((el, index) => (
            <div className="Desborder container" key={index}>
              <a className="Box" href={el.url} target="blank">
                <div className="Main">
                  <div className="img">
                    <img
                      src={el.urlToImage}
                      alt=""
                      style={{ width: "400px", height: "200px" }}
                    />
                  </div>
                  <div className="title">
                    <div className="flex justify-between items-center p-6 whitespace-nowrap">
                      <h1>{el.author}</h1>
                    </div>
                    <p>{el.description}</p>
                    {/* <p>{el.content}</p> */}
                  </div>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default NewsApi;
