import React from "react";
import Button from "../../common/components/Button";

const HeroSection = ({ onApplyClick }) => (
  <section className="bg-gradient-to-r from-purple-100 to-white py-20 text-center">
    <h1 className="text-4xl font-extrabold mb-4">
      가장 쉽게 <span className="text-purple-600">지식</span>을 공유하는 방법
    </h1>
    <p className="text-lg text-gray-700 mb-8">
      나누고 싶은 지식이 있는 누구나 멘토가 될 수 있어요! 업계 후배를 혹은 동료들이
      더 빨리, 더 멀리 갈 수 있도록 도와주세요!
    </p>
    <Button onClick={onApplyClick} variant="primary">
      멘토 지원하기
    </Button>
  </section>
);

export default HeroSection;