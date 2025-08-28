import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Testimonials from '../Testimonials';

describe('Testimonials Component', () => {
  beforeEach(() => {
    render(<Testimonials />);
  });

  describe('Header Section', () => {
    it('should render the main heading', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Ce que disent nos utilisateurs');
    });

    it('should render the subtitle', () => {
      const subtitle = screen.getByText(/Des milliers de Marocains font déjà confiance à VoyagaBagae pour leurs transports/);
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass('text-xl', 'text-gray-600');
    });

    it('should have correct heading styling', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-3xl', 'lg:text-4xl', 'font-bold', 'text-gray-900');
    });

    it('should have correct subtitle styling', () => {
      const subtitle = screen.getByText(/Des milliers de Marocains font déjà confiance à VoyagaBagae pour leurs transports/);
      expect(subtitle).toHaveClass('text-xl', 'text-gray-600', 'max-w-3xl', 'mx-auto');
    });
  });

  describe('Testimonials Grid', () => {
    it('should render exactly 3 testimonials', () => {
      const testimonialCards = document.querySelectorAll('.bg-white.rounded-2xl');
      expect(testimonialCards).toHaveLength(3);
    });

    it('should have correct grid layout classes', () => {
      const testimonialsContainer = document.querySelector('.grid');
      expect(testimonialsContainer).toHaveClass('lg:grid-cols-3');
    });

    it('should have proper spacing between testimonials', () => {
      const testimonialsContainer = document.querySelector('.grid');
      expect(testimonialsContainer).toHaveClass('gap-8');
    });
  });

  describe('Individual Testimonials', () => {
    it('should render all expected testimonials with correct names', () => {
      const expectedNames = ['Amina Benali', 'Youssef Alami', 'Fatima Zahra'];
      expectedNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it('should render all expected locations', () => {
      const expectedLocations = ['Casablanca', 'Rabat', 'Marrakech'];
      expectedLocations.forEach(location => {
        expect(screen.getByText(location)).toBeInTheDocument();
      });
    });

    it('should render all expected testimonial texts', () => {
      const expectedTexts = [
        /VoyagaBagae m'a fait économiser énormément sur l'envoi de colis à ma famille à Marrakech/,
        /Excellent moyen d'arrondir mes fins de mois ! Je transporte des colis lors de mes trajets Rabat-Fès/,
        /Une révolution pour les petits commerçants ! Je peux maintenant livrer mes produits artisanaux dans tout le Maroc/
      ];

      expectedTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    it('should have correct testimonial card styling', () => {
      const testimonialCards = document.querySelectorAll('.bg-white.rounded-2xl');
      testimonialCards.forEach(card => {
        expect(card).toHaveClass('bg-white', 'rounded-2xl', 'p-8', 'shadow-sm', 'hover:shadow-xl');
      });
    });

    it('should have hover effects on testimonial cards', () => {
      const testimonialCards = document.querySelectorAll('.hover\\:shadow-xl');
      expect(testimonialCards.length).toBe(3);
    });

    it('should have transition effects on testimonial cards', () => {
      const testimonialCards = document.querySelectorAll('.transition-shadow.duration-300');
      expect(testimonialCards.length).toBe(3);
    });
  });

  describe('Testimonial Avatars', () => {
    it('should render all 3 avatars', () => {
      const avatars = document.querySelectorAll('img');
      expect(avatars).toHaveLength(3);
    });

    it('should have correct avatar styling', () => {
      const avatars = document.querySelectorAll('img');
      avatars.forEach(avatar => {
        expect(avatar).toHaveClass('w-12', 'h-12', 'rounded-full', 'object-cover', 'mr-4');
      });
    });

    it('should have proper alt text for accessibility', () => {
      const avatars = document.querySelectorAll('img');
      const expectedNames = ['Amina Benali', 'Youssef Alami', 'Fatima Zahra'];
      
      avatars.forEach((avatar, index) => {
        expect(avatar).toHaveAttribute('alt', expectedNames[index]);
      });
    });

    it('should have valid avatar URLs', () => {
      const avatars = document.querySelectorAll('img');
      avatars.forEach(avatar => {
        expect(avatar).toHaveAttribute('src');
        const src = avatar.getAttribute('src');
        expect(src).toContain('pexels.com');
        expect(src).toContain('auto=compress');
      });
    });
  });

  describe('Star Ratings', () => {
    it('should render 5 stars for each testimonial', () => {
      const starGroups = document.querySelectorAll('.flex.items-center.mb-4');
      expect(starGroups).toHaveLength(3);
      
      starGroups.forEach(group => {
        const stars = group.querySelectorAll('svg');
        expect(stars).toHaveLength(5);
      });
    });

    it('should have correct star styling', () => {
      const stars = document.querySelectorAll('svg.h-5.w-5.text-yellow-400.fill-current');
      expect(stars.length).toBe(15); // 3 testimonials × 5 stars
    });

    it('should have yellow color for stars', () => {
      const stars = document.querySelectorAll('.text-yellow-400');
      expect(stars.length).toBe(15);
    });

    it('should have filled stars', () => {
      const filledStars = document.querySelectorAll('.fill-current');
      expect(filledStars.length).toBe(15);
    });
  });

  describe('Quote Icons', () => {
    it('should render quote icons for each testimonial', () => {
      const quoteIcons = document.querySelectorAll('.h-8.w-8.text-red-200');
      expect(quoteIcons).toHaveLength(3);
    });

    it('should have correct quote icon positioning', () => {
      const quoteIcons = document.querySelectorAll('.absolute.-top-2.-left-2');
      expect(quoteIcons).toHaveLength(3);
    });

    it('should have red color for quote icons', () => {
      const quoteIcons = document.querySelectorAll('.text-red-200');
      expect(quoteIcons.length).toBe(3);
    });
  });

  describe('Statistics Section', () => {
    it('should render the statistics container', () => {
      const statsContainer = document.querySelector('.bg-white.rounded-2xl.p-8.lg\\:p-12');
      expect(statsContainer).toBeInTheDocument();
    });

    it('should render all 3 statistics', () => {
      const stats = [
        { value: '4.9/5', label: 'Note moyenne', color: 'text-red-600' },
        { value: '15,000+', label: 'Avis positifs', color: 'text-green-600' },
        { value: '98%', label: 'Recommandent VoyagaBagae', color: 'text-blue-600' }
      ];

      stats.forEach(stat => {
        expect(screen.getByText(stat.value)).toBeInTheDocument();
        expect(screen.getByText(stat.label)).toBeInTheDocument();
      });
    });

    it('should have correct statistics styling', () => {
      const statValues = document.querySelectorAll('.text-3xl.font-bold');
      expect(statValues).toHaveLength(3);
      
      statValues.forEach(value => {
        expect(value).toHaveClass('text-3xl', 'font-bold', 'mb-2');
      });
    });

    it('should have different colors for each statistic', () => {
      const redStat = document.querySelector('.text-red-600');
      const greenStat = document.querySelector('.text-green-600');
      const blueStat = document.querySelector('.text-blue-600');
      
      expect(redStat).toBeInTheDocument();
      expect(greenStat).toBeInTheDocument();
      expect(blueStat).toBeInTheDocument();
    });

    it('should render 5 stars in the rating statistic', () => {
      const ratingStars = document.querySelectorAll('.text-center .flex.justify-center svg');
      expect(ratingStars).toHaveLength(5);
    });
  });

  describe('Layout and Styling', () => {
    it('should have light gray background', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('bg-gray-50');
    });

    it('should have proper section padding', () => {
      const section = screen.getByRole('region');
      expect(section).toHaveClass('py-20');
    });

    it('should have proper container max width', () => {
      const container = document.querySelector('.max-w-7xl');
      expect(container).toBeInTheDocument();
    });

    it('should have responsive padding', () => {
      const container = document.querySelector('.px-4.sm\\:px-6.lg\\:px-8');
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('should have proper spacing', () => {
      const header = document.querySelector('.text-center.mb-16');
      const stats = document.querySelector('.mt-16.text-center');
      
      expect(header).toHaveClass('mb-16');
      expect(stats).toHaveClass('mt-16');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text classes', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-3xl', 'lg:text-4xl');
    });

    it('should have responsive grid classes', () => {
      const testimonialsContainer = document.querySelector('.grid');
      expect(testimonialsContainer).toHaveClass('lg:grid-cols-3');
    });

    it('should have responsive padding for statistics', () => {
      const statsContainer = document.querySelector('.p-8.lg\\:p-12');
      expect(statsContainer).toHaveClass('p-8', 'lg:p-12');
    });

    it('should have responsive grid for statistics', () => {
      const statsGrid = document.querySelector('.grid.lg\\:grid-cols-3');
      expect(statsGrid).toHaveClass('lg:grid-cols-3');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBe(4); // 1 main + 3 testimonial names
      
      const mainHeading = headings[0];
      expect(mainHeading.tagName).toBe('H2');
    });

    it('should have proper image alt text', () => {
      const avatars = document.querySelectorAll('img');
      avatars.forEach(avatar => {
        expect(avatar).toHaveAttribute('alt');
        expect(avatar.getAttribute('alt')).toBeTruthy();
      });
    });

    it('should have proper text contrast', () => {
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveClass('text-gray-900');
      
      const subtitle = screen.getByText(/Des milliers de Marocains font déjà confiance à VoyagaBagae pour leurs transports/);
      expect(subtitle).toHaveClass('text-gray-600');
    });
  });

  describe('Interactive Elements', () => {
    it('should have hover effects on testimonial cards', () => {
      const testimonialCards = document.querySelectorAll('.hover\\:shadow-xl');
      expect(testimonialCards.length).toBe(3);
    });

    it('should have transition effects on testimonial cards', () => {
      const testimonialCards = document.querySelectorAll('.transition-shadow.duration-300');
      expect(testimonialCards.length).toBe(3);
    });

    it('should have proper border styling', () => {
      const testimonialCards = document.querySelectorAll('.border.border-gray-100');
      expect(testimonialCards.length).toBe(3);
    });
  });

  describe('Content Validation', () => {
    it('should contain app name', () => {
      expect(screen.getByText(/VoyagaBagae/)).toBeInTheDocument();
    });

    it('should mention Morocco in the content', () => {
      expect(screen.getByText(/Marocains/i)).toBeInTheDocument();
    });

    it('should have realistic statistics', () => {
      expect(screen.getByText('4.9/5')).toBeInTheDocument();
      expect(screen.getByText('15,000+')).toBeInTheDocument();
      expect(screen.getByText('98%')).toBeInTheDocument();
    });

    it('should have French language content', () => {
      expect(screen.getByText(/Ce que disent/i)).toBeInTheDocument();
      expect(screen.getByText(/utilisateurs/i)).toBeInTheDocument();
      expect(screen.getByText(/Note moyenne/i)).toBeInTheDocument();
    });

    it('should have meaningful testimonial content', () => {
      const testimonialTexts = [
        /économiser énormément/,
        /arrondir mes fins de mois/,
        /révolution pour les petits commerçants/
      ];

      testimonialTexts.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    it('should have realistic user names and locations', () => {
      const names = ['Amina Benali', 'Youssef Alami', 'Fatima Zahra'];
      const locations = ['Casablanca', 'Rabat', 'Marrakech'];
      
      names.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
      
      locations.forEach(location => {
        expect(screen.getByText(location)).toBeInTheDocument();
      });
    });
  });

  describe('Visual Effects', () => {
    it('should have shadow effects', () => {
      const elementsWithShadows = document.querySelectorAll('[class*="shadow"]');
      expect(elementsWithShadows.length).toBeGreaterThan(0);
    });

    it('should have rounded corners', () => {
      const elementsWithRoundedCorners = document.querySelectorAll('[class*="rounded"]');
      expect(elementsWithRoundedCorners.length).toBeGreaterThan(0);
    });

    it('should have proper spacing between elements', () => {
      const elementsWithMargin = document.querySelectorAll('[class*="mb-"], [class*="mt-"]');
      expect(elementsWithMargin.length).toBeGreaterThan(0);
    });
  });
});

