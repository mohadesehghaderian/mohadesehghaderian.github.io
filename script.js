/*
 * Custom JavaScript for Mohadeseh Ghaderian's academic portfolio.
 * This script initializes the AOS (Animate on Scroll) library to
 * bring the section content to life with subtle animations as
 * visitors scroll down the page. Additional interactive behaviors
 * (e.g., smooth scrolling, responsive navigation) can be added here.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animations once the DOM is fully loaded
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  }
});