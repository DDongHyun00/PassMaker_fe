import React from "react";
import FeatureCard from "./FeatureCard";
import { CheckCircle, Percent, Users, BookOpen } from "lucide-react";

const featureList = [
  {
    icon: CheckCircle,
    title: "강의보다 쉬운 지식공유 수단",
    description: "멘토링부터 시작해보는 건 어떨까요?",
  },
  {
    icon: Percent,
    title: "정산율 100%",
    description: "인프런은 모든 멘토링에 정산율 100%를 보장합니다!",
  },
  {
    icon: Users,
    title: "업계 관계자 네트워킹",
    description: "같은 분야의 전문가들과 네트워크를 쌓아보세요.",
  },
  {
    icon: BookOpen,
    title: "전문지식을 다듬을 수 있는 기회",
    description: "지식을 공유하며 스스로의 전문성을 강화하세요.",
  },
];

const FeaturesSection = () => (
  <section className="container mx-auto px-6 py-16">
    <h2 className="text-3xl font-bold text-center mb-12">이런 점이 좋아요!</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {featureList.map((f, idx) => (
        <FeatureCard
          key={idx}
          icon={f.icon}
          title={f.title}
          description={f.description}
        />
      ))}
    </div>
  </section>
);

export default FeaturesSection;