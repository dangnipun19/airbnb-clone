import Head from 'next/head'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import LargeCard from '../Components/LargeCard'
import MediumCard from '../Components/MediumCard'
import SmallCard from '../Components/SmallCard'

// href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd8kzP6fPTAgw2PEw894ujInWLzZZKQxHIk8vKEr51VAZU_YrQWejHiY5jd-ju5R6ZNN0&usqp=CAU"
export default function Home({exploreData,cardData}) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link rel="shortcut icon" href="airbnb_logo_icon_170605.ico"></link>
      </Head>

      
      <Header></Header>
     
      <Banner></Banner>
      
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map(({img,distance,location})=>(
              <SmallCard key={img} img = {img} distance = {distance} location={location}></SmallCard>
            )
            )}
          </div> 
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-x-scroll scrollbar-hide  p-3 -ml-3'>
            {cardData?.map((item)=>(
              <MediumCard key={item.img} img={item.img} title={item.title}></MediumCard>
            ))}
          </div>
          
        </section>
        <LargeCard 
          img='https://links.papareact.com/4cj'
          title = 'The Greatest Outdoors'
          description='Wishlists curated by Airbnb.'
          buttonText='Get Inspired'
        ></LargeCard>
      </main>
      <Footer></Footer>
    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
    res => res.json() 
  )
  const cardData = await fetch("https://www.jsonkeeper.com/b/VHHT") .then(
    res => res.json()
  )
  return {
    props:{
      exploreData,
      cardData
    }
  }
}
