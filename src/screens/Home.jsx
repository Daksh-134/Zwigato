import { React, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Card from '../components/Card';
import '../App.css'
export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("https://zwigato-4ipy.onrender.com/DisplayData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Nav />
      <div id="carouselExampleFade" className="carousel slide carousel-fade hide-on-small" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-item active">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg" height={700} className="d-block w-100" alt="..." style={{ filter: 'brightness(60%)' }} />
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: '10' }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg" height={700} className="d-block w-100" style={{ filter: 'brightness(60%)' }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://c.ndtvimg.com/2022-04/fq5cs53_biryani-doubletree-by-hilton_625x300_12_April_22.jpg" height={700} className="d-block w-100" style={{ filter: 'brightness(60%)' }} alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div>
        {foodCat.length > 0 ? foodCat.map((data) => {
          return (
            <div key={data._id} className='row m-3'>
              <div className="fs-3 m-3 col">
                {data.CategoryName}
              </div>
              <hr />
              {foodItem.length > 0 ?
                foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filterItem => {
                    return (
                      <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodName={filterItem.name} item={filterItem} options={filterItem.options[0]} ImgSrc={filterItem.img} />
                      </div>
                    )
                  }) : ""}
            </div>
          );
        }) : ""}
      </div>
      <Footer />
    </div>
  );
}
