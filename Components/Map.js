import { useState } from 'react';
import Map from 'react-map-gl';
import { getCenter } from 'geolib';
import { Marker,Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapArea({searchResults}) {

    const [selectedLocation,setSelectedLocation] = useState({})

    // transforming searchResults into required format

    const coordinates = searchResults.map((item)=>({
        longitude:item.long,
        latitude:item.lat
    }))
   const center = getCenter(coordinates)
   
   const[viewport,setViewport] = useState({
    width: '100%' ,
    height: '100%',
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11
})
  return (
    <Map 
    mapStyle='mapbox://styles/dang19/cl97d485j001u14quzlumwky5'
    mapboxAccessToken={process.env.mapbox_key}
    {...viewport}
    onMove = {(evt)=>setViewport(evt.viewport)}
    >
       {searchResults.map((result)=>(
        <div key={result.long}>
            <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetRight={-10}
                
            >
                <p onClick={()=>setSelectedLocation(result)} className='cursor-pointer text-2xl animate-bounce'>📌</p>

            </Marker>
            {selectedLocation.long === result.long && (
                <Popup
                onClose={()=>setSelectedLocation({})}
                closeOnClick={false}
                latitude={result.lat}
                longitude={result.long}
                >{result.title}</Popup>
            )}
            
        </div>
       ))} 
       
    </Map>
  )
} 

export default MapArea

// {selectedLocation.long===result.long && (
//     <Popup longitude={result.long} latitude={result.lat}
      
//       onClose={() => setSelectedLocation({})} closeOnClick={false}>
          
//       {result.title}
//     </Popup>)}   