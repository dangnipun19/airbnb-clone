import Header from "../Components/Header"
import Footer from '../Components/Footer'
import { useRouter } from "next/router"

import moment from 'moment';
import InfoCard from "../Components/InfoCard";

import MapArea from "../Components/Map";

function Search({searchResults}) {
    const router = useRouter()
    const {location,startDate,endDate,noOfGuests} = router.query
    const formattedStartDate = moment(new Date(startDate)).format('DD MMMM YY')
    const formattedEndDate = moment(new Date(endDate)).format('DD MMMM YY')
    const range = `${formattedStartDate} - ${formattedEndDate}`
    
   
   
  return (
    <div>
        <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}></Header>

        <main className="flex">
            <section className="flex-grow pt-14 px-6">
                <p className="text-xs">300+ Stays - {range} - for {noOfGuests} guests</p>

                <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancellation Flexibility</p>
                    <p className="button">Type of Place</p>
                    <p className="button">Rooms and Beds</p>
                    <p className="button">More Filters</p>
                </div>
                
                <div className="flex flex-col">
                    {searchResults.map(item=>(
                        <InfoCard
                            key={item.img}
                            img={item.img}
                            location = {item.location}
                            title={item.title}
                            description={item.description}
                            star={item.star}
                            price={item.price}
                            total={item.total}
                        ></InfoCard>
                    ))}
                </div>
                
            </section>

            <section className="hidden xl:inline-flex xl:min-w-[600px]">
                <MapArea searchResults = {searchResults}></MapArea>
            </section>
        </main>

        <Footer></Footer>
    </div>
  )
}

export default Search

export async function getServerSideProps(){
    const searchResults = await fetch('https://www.jsonkeeper.com/b/5NPS').then(
        res => res.json()
    )
    return{
        props:{
            searchResults
        }
    }
}