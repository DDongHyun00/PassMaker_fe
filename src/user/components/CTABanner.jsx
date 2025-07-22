import React from "react";
import Button from "../../common/components/Button";

const CTABanner = ({ onApplyClick }) => (
  <section className="bg-gradient-to-r from-purple-700 to-purple-400 py-16 text-center text-white">
    <h2 className="text-2xl font-bold mb-4">
      나누고 싶은 지식이 있는 누구나 멘토가 될 수 있어요.
    </h2>
    <Button onClick={onApplyClick} variant="secondary">
      멘토 지원하기
    </Button>
  </section>
);

export default CTABanner;