# Hotel-helper

The project consists of two primary components: a frontend Angular application found in the hotel-manager-app directory, and a REST API backend located in the Rest-api directory. This documentation briefly outlines the structure and functionalities of these components, focusing specifically on the hotel-manager application within the frontend part.

## Hotel-manager-app 

The frontend of the project is built with Angular and is located within the src directory.

## Structure of the 'src' Directory

1. Core Application Files:

* favicon.ico: A small icon associated with the website, displayed in the browser's address bar or next to the site name in a bookmark list.
* index.html: The main HTML file that serves as the entry point for the application. It primarily includes the root Angular component (<app-root></app-root>).
* main.ts: The main TypeScript entry point for Angular, responsible for bootstrapping the application's root module.
* styles.css: Global stylesheet for the entire Angular application, containing CSS rules that apply universally.

2. Configuration and Assets:

* environments/: Contains configuration files for different deployment environments, such as development and production
* assets/: A directory for static files like images

## Application Core (app/ Directory)

The app/ directory is the heart of the Angular application, containing components, services, modules, and more.

3. Components and Modules: 

* app.component.html/css/ts: Defines the root component of the application, including its HTML template, styles, and TypeScript class. This component acts as the main container for the app.
* app.module.ts: The root module that declares all components used in the application and imports Angular's core and shared modules.
* app-routing.module.ts: Specifies the routes for the application, defining the navigation structure.

4. Feature Modules: 

* home/: Contains components and services related to the home view of the application, serving as the landing page.
* user/: Contains components, services, and models related to user management, such as authentication, etc.
* guests/: Specific to managing hotel guests, including functionalities for guest check-in in the created meal event, management, and guest-related services.
* meal-events/: Handles meal planning and event management, such as creating, selecting or deselecting or deleting meal event.
* menu/, menu-items/: These directories are responsible for managing the hotel's menu and individual menu items, including creating, updating, and displaying menus and dishes.

5. Core Functionality

* core/: Contains core functionalities that are globally used across the application, such as footer, header
* services/: Dedicated to Angular services that handle data retrieval, application logic, and business rules.
* interceptors/: Holds HTTP interceptors that intercept and modify HTTP requests and responses globally.

6. Utilities and Helpers

* types/: Defines TypeScript interfaces or types that are used throughout the application to enforce typing of  variables, parameters, and object structures.
* utils/: Contains utility functions or classes that provide reusable logic, such as data formatting, validation functions, etc.
* pipes/: Custom Angular pipes for transforming displayed values within HTML templates, like date formatting, filtering data, etc.
* animations/: Defines animations that can be applied to Angular components to enhance user interaction and UI dynamics.

## Summary
This detailed structure outlines the frontend part of the hotel-manager application, showcasing the organization and functionality of different modules and components within the Angular framework. Each directory and file has a specific role, ensuring modularity, reusability, and ease of maintenance.

