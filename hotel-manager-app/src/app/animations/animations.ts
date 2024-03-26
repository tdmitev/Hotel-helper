import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 })),
  ]),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    animate('0.5s', style({ opacity: 0 }))
  ]),
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('0.5s', style({ transform: 'translateY(0)' })),
  ]),
]);

export const slideOut = trigger('slideOut', [
  transition(':leave', [
    animate('0.5s', style({ transform: 'translateY(-100%)' }))
  ]),
]);

export const dropDown = trigger('dropdown', [
    state('closed', style({
      height: '0',
      opacity: '0'
    })),
    state('open', style({
      height: '*',
      opacity: '1'
    })),
    transition('closed <=> open', animate('300ms ease-out')),
  ]);

  export const rotate = trigger('rotate', [
    state('default', style({
      transform: 'rotate(0deg)'
    })),
    state('rotated', style({
      transform: 'rotate(180deg)'
    })),
    transition('default <=> rotated', animate('300ms ease-out'))
  ]);