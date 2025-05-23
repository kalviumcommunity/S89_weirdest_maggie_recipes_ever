import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.8;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const SubTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
    color: #555;
  }

  li:last-child {
    border-bottom: none;
  }
`;

const JoinCommunity = styled(Section)`
  background-color: #ff6b6b;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  text-align: justify;
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1rem auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>About Weirdest Maggi Recipes</Title>
      
      <Image src='https://5.imimg.com/data5/XG/IR/GLADMIN-60795231/maggie.png' alt="Delicious Maggi" />

      <Section>
        <SubTitle>Our Vision</SubTitle>
        <Description>
          Welcome to a unique culinary adventure where we explore the most unconventional
          and creative ways to prepare everyone's favorite instant noodles - Maggi!
          From sweet to savory, from bizarre to brilliant, we're here to push the
          boundaries of what's possible with a packet of Maggi.
        </Description>
      </Section>

      <Section>
        <SubTitle>What We Offer</SubTitle>
        <List>
          <li>Curated collection of the weirdest Maggi recipes</li>
          <li>Detailed step-by-step cooking instructions</li>
          <li>Community-driven recipe submissions</li>
          <li>Recipe ratings and reviews</li>
          <li>High-quality recipe photos and videos</li>
        </List>
      </Section>

      <Section>
        <SubTitle>Built With</SubTitle>
        <List>
          <li>Frontend: React & Redux</li>
          <li>Backend: Node.js & Express</li>
          <li>Database: MongoDB</li>
          <li>API Integration: Axios</li>
        </List>
      </Section>

      <JoinCommunity>
        <SubTitle>Join Our Community</SubTitle>
        <Description>
          Are you ready to contribute your own weird Maggi creation? Share your
          recipes, rate others' creations, and be part of our growing community
          of experimental Maggi enthusiasts!
        </Description>
      </JoinCommunity>
    </AboutContainer>
  );
};

export default About;