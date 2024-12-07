
import Header from '../components/application_component/Header';
import Hero from '@/components/application_component/Hero';
import React from 'react';
import IntroductionComponent from '@/components/application_component/IntroductionComponent';
export default function Home() {
  return (
    <div>
      {/* <Header/> */}

      <Hero></Hero>
      <IntroductionComponent></IntroductionComponent>
    </div>
  );
}
