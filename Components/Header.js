import Image from "next/image"
import {MagnifyingGlassIcon,
    GlobeAltIcon,
    Bars3Icon,
    UserCircleIcon,
    UsersIcon
} from "@heroicons/react/24/solid"
import { useState } from "react"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";



function Header({placeholder}) {
  const [searchInput,setSearchInput] = useState('')
  const [startDate,setStartDate] = useState(new Date())
  const [endDate,setEndDate] = useState(new Date())
  const [noOfGuests,setnoOfGuests] = useState(1)
  const router = useRouter()
  const selectionRange = {
    startDate:startDate,
    endDate:endDate,
    key:'selection',
  }

  const handleSelect =(ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }
  const resetInput = () =>{
    setSearchInput("")
  }

  const search =()=>{
    router.push({
      pathname:'/search',
      query:{
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate:endDate.toISOString(),
        noOfGuests

      }
    })
  }
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
        {/* left section */}
        <div onClick={()=> router.push('/')} className="relative flex items-center h-10 my-auto cursor-pointer">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" layout="fill" objectFit="contain" objectPosition='left'></Image>
        </div>
        {/* middle section */}
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-lg">
        <input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} type="text" placeholder={placeholder ||"Start your search"} className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"></input>
        <MagnifyingGlassIcon className="hidden text-white bg-red-400 h-8 rounded-full p-2 cursor-pointer md:inline-flex md:mx-2"></MagnifyingGlassIcon>
        </div>
        {/* right section */}
        <div className="flex space-x-4 items-center justify-end text-gray-500">
            <p className="hidden md:inline cursor-pointer">Become a host</p>
            <GlobeAltIcon className="h-6 cursor-pointer"></GlobeAltIcon>
            <div className="flex space-x-2 p-2 border-2 rounded-full items-center">
                <Bars3Icon className="h-6 cursor-pointer"></Bars3Icon>
                <UserCircleIcon className="h-6 cursor-pointer "></UserCircleIcon>
            </div>
        </div>

        
          {searchInput && (
            <div className="flex flex-col col-span-3 mx-auto">
              <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={['#FD5B61']} onChange={handleSelect}></DateRangePicker>
              <div className="flex items-center border-b mb-4">
                <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                <UsersIcon className="h-5"></UsersIcon>
                <input value={noOfGuests} onChange={e=>setnoOfGuests(e.target.value)} min={1} type='number' className='w-12 pl-2 text-lg text-red-400 outline-none'></input>
              </div>
              <div className="flex">
                <button className="flex-grow" onClick={resetInput}>Cancel</button>
                <button className="flex-grow text-red-400" onClick={search}>Search</button>
              </div>
            </div>
          )}
          
        
    </header>
  )
}

export default Header