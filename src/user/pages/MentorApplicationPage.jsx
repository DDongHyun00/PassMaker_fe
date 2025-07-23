import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import FAQSection from "../components/FAQSection";
import CTABanner from "../components/CTABanner";
import MyPageModal from "../../common/modal/MyPageModal";
import MentorApplicationForm from "../components/MentorApplicationForm";

const MentorApplicationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <HeroSection onApplyClick={openModal} />
        <FeaturesSection />
        <FAQSection />
        <CTABanner onApplyClick={openModal} />
      </div>

      {isModalOpen && (
        <MyPageModal onClose={closeModal} className="max-w-3xl"> {/* 여기에 원하는 Tailwind max-w-* 클래스를 입력하세요. 예: max-w-xl, max-w-2xl, max-w-3xl 등 */}
          <MentorApplicationForm onClose={closeModal} />
        </MyPageModal>
      )}
    </>
  );
};

export default MentorApplicationPage;