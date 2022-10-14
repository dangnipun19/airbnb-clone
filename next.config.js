/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['upload.wikimedia.org','links.papareact.com']
  },
  env:{
    mapbox_key:'pk.eyJ1IjoiZGFuZzE5IiwiYSI6ImNsOTdjd2kybzA5dGM0MW1xNzhvaDN3eWgifQ.fkkfNjKUeeYp1fL4KPcUFw'
  }
}

module.exports = nextConfig
