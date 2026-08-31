import React from 'react';
import { getCategoryBySlug } from '../data/legalData';

export default function CategoryBadge({ categoryName, categorySlug, onClick, className = '' }) {
  const category = getCategoryBySlug(categorySlug);
  const color = category ? category.color : '#3B82F6';
  const bgLight = category ? category.bgLight : 'rgba(59, 130, 246, 0.1)';

  return (
    <span
      onClick={onClick}
      className={`badge ${className}`}
      style={{
        backgroundColor: bgLight,
        color: color,
        border: `1px solid ${color}40`,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block'
        }}
      />
      {categoryName || (category ? category.name : 'Legal')}
    </span>
  );
}
