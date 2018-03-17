import Link from 'next/link'
import React from 'react'
import Head from '../components/head'


class Index extends React.Component{


componentDidMount = () => {
  if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
          .catch(err => console.error("Service worker registration failed", err))
  } else {
      console.log("Service worker not supported");
  }
}


  render(){
    return(
      <div>
        <Head title="home"/>
      <div>Hello World</div>

      <Link href="/about"><a>Go to about</a></Link>
      </div>
    )
  }
}


export default Index