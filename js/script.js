document.addEventListener('DOMContentLoaded', function() {
    // Project data with proper URLs for each project
    const projects = {
        'mealtime-magic': {
            title: 'Mealtime Magic',
            description: 'A recipe website that allows users to browse, add, and get recipes. Features include recipe filtering and interactive elements.',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'web',
            url: 'https://jjumaaa.github.io/Mealtime-Magic-Project/'
        },
        'ramen-rater': {
            title: 'Ramen Rater',
            description: 'A website that allows customers to rate their favorite ramen dishes with interactive rating functionality.',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'web',
            url: 'https://jjumaaa.github.io/Phase-1-Code-Challenge-Ramen-Rater/'
        },
        'lost-movieweb': {
            title: 'Lost MovieWeb',
            description: 'A digital archive for rediscovering forgotten cinematic treasures',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'upcoming'
        },
        'reinovating-kenya': {
            title: 'Reinovating Kenya',
            description: 'An upcoming project about transportation in Kenya',
            technologies: ['Coming Soon'],
            category: 'upcoming'
        }
    };

    // Add filter buttons dynamically
    const filterButtons = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="web">Web Projects</button>
        <button class="filter-btn" data-filter="upcoming">Upcoming</button>
    `;
    document.querySelector('.projects-gallery .subtitle').insertAdjacentHTML('afterend', 
        `<div class="filter-buttons">${filterButtons}</div>`);

    // Add data attributes to existing gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const projectId = Object.keys(projects)[index];
        item.setAttribute('data-project', projectId);
        item.setAttribute('data-category', projects[projectId].category);
        
        // Store the original link in a data attribute
        const link = item.querySelector('.gallery-link');
        link.setAttribute('data-project', projectId);
        link.setAttribute('data-original-href', link.href);
    });

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            galleryItems.forEach(item => {
                if (filterValue === 'all' || 
                    item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightboxHTML = `
    <div class="lightbox" id="project-lightbox">
        <div class="lightbox-content">
            <span class="close-btn">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-details">
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-description"></p>
                <div class="lightbox-tech">
                    <h4>Technologies Used:</h4>
                    <ul class="tech-list"></ul>
                </div>
                <a href="#" class="general-link style-red lightbox-demo" target="_blank">View Live Demo</a>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // Lightbox elements
    const lightbox = document.getElementById('project-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const techList = document.querySelector('.tech-list');
    const lightboxDemo = document.querySelector('.lightbox-demo');
    const closeBtn = document.querySelector('.close-btn');

    // Open lightbox when clicking project links
    document.querySelectorAll('.gallery-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            const projectImg = this.closest('.gallery-item').querySelector('img').src;
            
            if (project) {
                lightboxImage.src = projectImg;
                lightboxImage.alt = project.title;
                lightboxTitle.textContent = project.title;
                lightboxDescription.textContent = project.description;
                
                // Set technologies
                techList.innerHTML = '';
                project.technologies.forEach(tech => {
                    const li = document.createElement('li');
                    li.textContent = tech;
                    techList.appendChild(li);
                });
                
                // Set demo URL based on original link
                const originalLink = this.getAttribute('data-original-href') || this.href;
                lightboxDemo.href = originalLink.includes('http') ? originalLink : '#';
                
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});