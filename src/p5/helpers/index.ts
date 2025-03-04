import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { initializeIcons } from './initializeIcons';
import { applyMouseRepulsion, applyCardTargeting, createIconsAtPosition } from './mouseInteractions';
import { updateIconPosition } from './iconPhysics';
import { drawIcon } from './renderIcons';
