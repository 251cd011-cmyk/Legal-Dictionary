import React from 'react';
import {
  ShieldAlert,
  Scale,
  Landmark,
  Users,
  Briefcase,
  FileCheck2,
  Home,
  HardHat,
  ShieldCheck,
  Receipt,
  ShoppingBag,
  Search,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ICON_MAP = {
  ShieldAlert,
  Scale,
  Landmark,
  Users,
  Briefcase,
  FileCheck2,
  Home,
  HardHat,
  ShieldCheck,
  Receipt,
  ShoppingBag,
  Search,
};

export default function CategoryCard({ category }) {
  const { navigate } = useApp();

  if (!category) return null;

  const IconComponent = ICON_MAP[category.iconName] || BookOpen;

  const handleCardClick = () => {
    navigate(`/categories/${category.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="category-card card-interactive"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      style={{
        '--cat-color': category.color,
        '--cat-bg': category.bgLight,
      }}
      aria-label={`Explore terms in ${category.name}`}
    >
      <div>
        <div className="category-icon-box">
          <IconComponent size={24} />
        </div>

        <h3 className="category-card-title">
          {category.name}
        </h3>

        <p className="category-card-desc">
          {category.description}
        </p>
      </div>

      <div className="category-card-meta">
        <span>{category.termCount} Legal Terms</span>
        <span style={{ color: category.color, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          Explore <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}
