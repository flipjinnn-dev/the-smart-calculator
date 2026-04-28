# Sounds Directory

This directory contains sound effects for the wheel spinning games.

## Required Files

### wheel-spin.mp3
- **Purpose**: Spinning sound effect for Country Wheel and Clash Royale Wheel
- **Format**: MP3 audio file
- **Volume**: Set to 30% in code (adjustable)
- **Duration**: Should be 3-5 seconds to match the wheel spin animation

## How to Add Sound

1. Download or create a wheel spinning sound effect (MP3 format)
2. Save it as `wheel-spin.mp3` in this directory
3. The sound will automatically play when users click the spin button

## Sound Sources

You can get wheel spinning sounds from:
- Free sound effect websites (Pixabay, Zapsplat, etc.)
- Create your own using audio editing software
- Use royalty-free game sound libraries

## Current Implementation

Both wheels (Country Wheel and Clash Royale Wheel) are coded to play the spinning sound:
- Sound plays when spin button is clicked
- Volume is set to 30% to avoid being too loud
- Audio errors are caught and logged (won't break the game if sound file is missing)

## Note

The spinning sound is optional - the games work perfectly without sound files.
