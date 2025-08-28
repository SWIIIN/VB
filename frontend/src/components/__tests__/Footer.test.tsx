import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  describe('Brand Section', () => {
    it('should render the brand logo and name', () => {
      const brandName = screen.getByText('VoyagaBagae');
      expect(brandName).toBeInTheDocument();
      expect(brandName).toHaveClass('text-xl', 'font-bold');
    });

    it('should render the brand description', () => {
      const description = screen.getByText(/La première plateforme de transport collaboratif de colis au Maroc/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-gray-300');
    });

    it('should render the brand icon', () => {
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('h-6', 'w-6', 'text-white');
    });

    it('should have gradient background for brand icon', () => {
      const iconContainer = document.querySelector('[class*="bg-gradient-to-r"]');
      expect(iconContainer).toHaveClass('bg-gradient-to-r', 'from-red-600', 'to-orange-500');
    });
  });

  describe('Contact Information', () => {
    it('should render email contact', () => {
      const email = screen.getByText('contact@voyagabagae.ma');
      expect(email).toBeInTheDocument();
      expect(email).toHaveClass('text-sm', 'text-gray-300');
    });

    it('should render phone contact', () => {
      const phone = screen.getByText('+212 5XX-XXX-XXX');
      expect(phone).toBeInTheDocument();
      expect(phone).toHaveClass('text-sm', 'text-gray-300');
    });

    it('should render contact icons', () => {
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThanOrEqual(2);
      
      const mailIcon = screen.getByText('contact@voyagabagae.ma').previousElementSibling;
      const phoneIcon = screen.getByText('+212 5XX-XXX-XXX').previousElementSibling;
      
      expect(mailIcon).toHaveClass('h-4', 'w-4', 'text-red-400');
      expect(phoneIcon).toHaveClass('h-4', 'w-4', 'text-red-400');
    });
  });

  describe('Footer Sections', () => {
    it('should render all 4 footer sections', () => {
      const sectionTitles = [
        'VoyagaBagae',
        'Services',
        'Destinations populaires',
        'Légal'
      ];

      sectionTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('should render correct number of links in each section', () => {
      const sections = [
        { title: 'VoyagaBagae', linkCount: 5 },
        { title: 'Services', linkCount: 5 },
        { title: 'Destinations populaires', linkCount: 5 },
        { title: 'Légal', linkCount: 5 }
      ];

      sections.forEach(section => {
        const sectionElement = screen.getByText(section.title).closest('div');
        const links = sectionElement?.querySelectorAll('a');
        expect(links).toHaveLength(section.linkCount);
      });
    });

    it('should render specific links in Services section', () => {
      const serviceLinks = [
        'Envoyer un colis',
        'Devenir transporteur',
        'Transport express',
        'Assurance colis',
        'Suivi en temps réel'
      ];

      serviceLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('should render specific links in Destinations section', () => {
      const destinationLinks = [
        'Casablanca - Rabat',
        'Marrakech - Casablanca',
        'Fès - Meknès',
        'Tanger - Tétouan',
        'Agadir - Essaouira'
      ];

      destinationLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('should render specific links in Legal section', () => {
      const legalLinks = [
        'Conditions d\'utilisation',
        'Politique de confidentialité',
        'Mentions légales',
        'Cookies',
        'Charte de qualité'
      ];

      legalLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('should have hover effects on links', () => {
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('hover:text-red-400', 'transition-colors');
      });
    });
  });

  describe('Social Media Section', () => {
    it('should render social media heading', () => {
      const heading = screen.getByText('Suivez-nous');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('font-semibold', 'text-lg');
    });

    it('should render all 3 social media icons', () => {
      const socialIcons = document.querySelectorAll('a[href="#"] svg');
      expect(socialIcons.length).toBe(3);
    });

    it('should have correct social media styling', () => {
      const socialLinks = document.querySelectorAll('a[href="#"]');
      socialLinks.forEach(link => {
        expect(link).toHaveClass('bg-gray-800', 'p-3', 'rounded-full', 'hover:bg-red-600');
      });
    });

    it('should have proper social media icon sizes', () => {
      const socialIcons = document.querySelectorAll('a[href="#"] svg');
      socialIcons.forEach(icon => {
        expect(icon).toHaveClass('h-5', 'w-5');
      });
    });
  });

  describe('Newsletter Section', () => {
    it('should render newsletter heading', () => {
      const heading = screen.getByText('Newsletter');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('font-semibold', 'text-lg');
    });

    it('should render email input field', () => {
      const emailInput = screen.getByPlaceholderText('Votre adresse email');
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should render subscribe button', () => {
      const subscribeButton = screen.getByRole('button', { name: /S'abonner/i });
      expect(subscribeButton).toBeInTheDocument();
      expect(subscribeButton).toHaveClass('bg-red-600', 'hover:bg-red-700');
    });

    it('should render newsletter description', () => {
      const description = screen.getByText(/Recevez nos dernières nouvelles et offres spéciales/);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm', 'text-gray-400');
    });

    it('should have proper input styling', () => {
      const emailInput = screen.getByPlaceholderText('Votre adresse email');
      expect(emailInput).toHaveClass('flex-1', 'px-4', 'py-3', 'rounded-l-lg', 'bg-gray-800');
    });

    it('should have proper button styling', () => {
      const subscribeButton = screen.getByRole('button', { name: /S'abonner/i });
      expect(subscribeButton).toHaveClass('px-6', 'py-3', 'rounded-r-lg', 'font-semibold');
    });
  });

  describe('Copyright Section', () => {
    it('should render copyright text', () => {
      const copyright = screen.getByText(/© 2024 VoyagaBagae. Tous droits réservés. Conçu avec ❤️ au Maroc./);
      expect(copyright).toBeInTheDocument();
      expect(copyright).toHaveClass('text-gray-400', 'text-sm');
    });

    it('should contain current year', () => {
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('should contain app name', () => {
      expect(screen.getByText(/VoyagaBagae/)).toBeInTheDocument();
    });

    it('should mention Morocco', () => {
      expect(screen.getByText(/Maroc/)).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should have dark background', () => {
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-gray-900', 'text-white');
    });

    it('should have proper grid layout', () => {
      const mainGrid = document.querySelector('.grid.lg\\:grid-cols-5');
      expect(mainGrid).toBeInTheDocument();
    });

    it('should have proper spacing', () => {
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('py-16');
    });

    it('should have border separators', () => {
      const borders = document.querySelectorAll('.border-t.border-gray-800');
      expect(borders.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid classes', () => {
      const mainGrid = document.querySelector('.grid.lg\\:grid-cols-5');
      expect(mainGrid).toHaveClass('lg:grid-cols-5');
    });

    it('should have responsive padding', () => {
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('should have responsive grid for social/newsletter section', () => {
      const socialNewsletterGrid = document.querySelector('.grid.lg\\:grid-cols-2');
      expect(socialNewsletterGrid).toHaveClass('lg:grid-cols-2');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(6);
      
      headings.forEach(heading => {
        expect(heading.tagName).toBe('H3');
      });
    });

    it('should have proper link roles', () => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(20);
    });

    it('should have proper button roles', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should have proper input roles', () => {
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBe(1);
    });
  });

  describe('Interactive Elements', () => {
    it('should have hover effects on social media links', () => {
      const socialLinks = document.querySelectorAll('a[href="#"]');
      socialLinks.forEach(link => {
        expect(link).toHaveClass('hover:bg-red-600');
      });
    });

    it('should have hover effects on footer links', () => {
      const footerLinks = screen.getAllByRole('link');
      footerLinks.forEach(link => {
        if (link.textContent && !link.textContent.includes('@')) {
          expect(link).toHaveClass('hover:text-red-400');
        }
      });
    });

    it('should have transition effects', () => {
      const elementsWithTransitions = document.querySelectorAll('[class*="transition"]');
      expect(elementsWithTransitions.length).toBeGreaterThan(0);
    });
  });

  describe('Content Validation', () => {
    it('should contain app name multiple times', () => {
      const appNameOccurrences = screen.getAllByText(/VoyagaBagae/i);
      expect(appNameOccurrences.length).toBeGreaterThanOrEqual(2);
    });

    it('should have French language content', () => {
      expect(screen.getByText(/Suivez-nous/i)).toBeInTheDocument();
      expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
      expect(screen.getByText(/S'abonner/i)).toBeInTheDocument();
    });

    it('should have realistic contact information', () => {
      expect(screen.getByText(/contact@voyagabagae.ma/)).toBeInTheDocument();
      expect(screen.getByText(/\+212 5XX-XXX-XXX/)).toBeInTheDocument();
    });

    it('should have proper email format in placeholder', () => {
      const emailInput = screen.getByPlaceholderText('Votre adresse email');
      expect(emailInput).toHaveAttribute('type', 'email');
    });
  });
});

