import Link from 'next/link'
import React from 'react'
import Head from '../components/head'


class About extends React.Component{


  render(){
    return(
      <div>
        <Head title="about"/>
      <div>Este es el about</div>
      <Link href="/"><a>Back to Home</a></Link>
      </div>
    )
  }
}


export default About