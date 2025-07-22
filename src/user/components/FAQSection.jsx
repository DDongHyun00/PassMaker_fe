import React, { useState } from "react";

const FAQSection = () => {
  const faqs = [
    { question: "멘토링이 뭔가요?", answer: "멘토링에 대한 설명이 들어갑니다." },
    { question: "멘토가 되려면 어떻게 하나요?", answer: "멘토 지원 절차를 확인해보세요." },
    { question: "멘토링을 어떻게 활용할 수 있을까요?", answer: "다양한 활용 사례가 있습니다." },
    { question: "멘토링은 어떻게 진행되나요?", answer: "1:1 또는 그룹 멘토링으로 진행됩니다." },
    { question: "멘토링을 수락했는데 급한 일이 생겼어요! 수락 후 취소가 되나요?", answer: "사정에 따라 취소 가능합니다." },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">자주 묻는 질문</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded">
            <button
              className="w-full flex justify-between items-center p-4"
              onClick={() => toggle(idx)}
            >
              <span>{faq.question}</span>
              <span>{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="p-4 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;