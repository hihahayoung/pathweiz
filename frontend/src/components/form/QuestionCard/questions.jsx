import React from 'react';
import TextQuestion from '../TextQuestion/TextQuestion';
import RadioQuestion from '../RadioQuestion/RadioQuestion';
import LikertQuestion from '../LikertQuestion/LikertQuestion';
import LikertGroup from '../LikertGroup/LikertGroup';
import CheckboxQuestion from '../CheckboxQuestion/CheckboxQuestion';

export const getQuestions = (formData, handleInputChange) => [
  // Category 1: University
  { type: 'category', label: 'Section 1: Fields of Study' },
  {
    id: 'collegeYear',
    type: 'text',
    label: 'Which year of college are you in?',
    placeholder: 'Enter your year of college',
    render: () => (
      <TextQuestion
        label="Which year of college are you in?"
        value={formData.collegeYear}
        placeholder="Enter your year of college"
        onChange={(e) => handleInputChange('collegeYear', e.target.value)}
      />
    ),
  },
  {
    id: 'fieldOfStudy',
    type: 'text',
    label: 'What is your current field of study or intended major/minor?',
    placeholder: 'Enter your field of study',
    render: () => (
      <TextQuestion
        label="What is your current field of study or intended major/minor?"
        value={formData.fieldOfStudy}
        placeholder="Enter your field of study"
        onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
      />
    ),
  },
  {
    id: 'favoriteCourse',
    type: 'text',
    label: 'Which course (college or independent) have you enjoyed most?',
    placeholder: 'Enter your favorite course',
    render: () => (
      <TextQuestion
        label="Which course (college or independent) have you enjoyed most?"
        value={formData.favoriteCourse}
        placeholder="Enter your favorite course"
        onChange={(e) => handleInputChange('favoriteCourse', e.target.value)}
      />
    ),
  },
  {
    id: 'surprisingCourse',
    type: 'text',
    label: 'Which course has positively surprised you the most so far?',
    placeholder: 'Enter the course that surprised you',
    render: () => (
      <TextQuestion
        label="Which course has positively surprised you the most so far?"
        value={formData.surprisingCourse}
        placeholder="Enter the course that surprised you"
        onChange={(e) => handleInputChange('surprisingCourse', e.target.value)}
      />
    ),
  },

  // Category 2: Interests and Passions
  { type: 'category', label: 'Section 2: Interests and Passions' },
  {
    id: 'topHobbies',
    type: 'text',
    label: 'What are your top 3 hobbies or interests outside of school?',
    placeholder: 'Enter your hobbies or interests',
    render: () => (
      <TextQuestion
        label="What are your top 3 hobbies or interests outside of school?"
        value={formData.topHobbies}
        placeholder="Enter your hobbies or interests"
        onChange={(e) => handleInputChange('topHobbies', e.target.value)}
      />
    ),
  },
  {
    id: 'jobsInternships',
    type: 'radio',
    label: 'Have you completed any jobs or internships?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
    render: () => (
      <RadioQuestion
        label="Have you completed any jobs or internships?"
        name="jobsInternships"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
        selectedValue={formData.jobsInternships}
        onChange={(e) => handleInputChange('jobsInternships', e.target.value)}
      />
    ),
  },
  {
    id: 'likedAspects',
    type: 'text',
    label: 'Which aspects about previous jobs or internships did you enjoy?',
    placeholder: 'Enter the aspects you liked',
    render: () => (
      <TextQuestion
        label="Which aspects about previous jobs or internships did you enjoy?"
        value={formData.likedAspects}
        placeholder="Enter the aspects you liked"
        onChange={(e) => handleInputChange('likedAspects', e.target.value)}
      />
    ),
  },
  {
    id: 'dislikedAspects',
    type: 'text',
    label: 'Which aspects about previous jobs or internships did you dislike?',
    placeholder: 'Enter the aspects you disliked',
    render: () => (
      <TextQuestion
        label="Which aspects about previous jobs or internships did you dislike?"
        value={formData.dislikedAspects}
        placeholder="Enter the aspects you disliked"
        onChange={(e) => handleInputChange('dislikedAspects', e.target.value)}
      />
    ),
  },

  // Category 3: Green Flags and Red Flags
  { type: 'category', label: 'Section 3: Work Style and Industry Preferences' },
  {
    id: 'careerPriorities',
    type: 'likertGroup',
    label: 'Please rate how important the following aspects of your career are',
    likertStart: 'Not important',
    likertEnd: 'Extremely important',
    options: [
      { id: 'stabilitySecurity', label: 'Stability and security' },
      { id: 'learningGrowth', label: 'Learning and growth' },
      { id: 'workLifeBalance', label: 'Work-life balance' },
      { id: 'socialImpact', label: 'Positive social impact' },
      { id: 'creativityInnovation', label: 'Creativity and innovation' },
      { id: 'highIncomeAdvancement', label: 'High income and advancement' },
    ],
    render: () => (
      <LikertGroup
        label="Please rate how important the following aspects of your career are"
        options={[
          { id: 'stabilitySecurity', label: 'Stability and security' },
          { id: 'learningGrowth', label: 'Learning and growth' },
          { id: 'workLifeBalance', label: 'Work-life balance' },
          { id: 'socialImpact', label: 'Positive social impact' },
          { id: 'creativityInnovation', label: 'Creativity and innovation' },
          { id: 'highIncomeAdvancement', label: 'High income and advancement' },
        ]}
        likertStart="Not important"
        likertEnd="Extremely important"
        formData={formData}
        onChange={handleInputChange}
      />
    ),
  },
  {
    id: 'idealWorkEnvironment',
    type: 'checkbox',
    label: 'What’s your ideal work environment?',
    options: [
      { value: 'startup_culture', label: 'Startup culture (fast-paced, innovative)' },
      { value: 'corporate_structure', label: 'Corporate structure (clear hierarchy, stability)' },
      { value: 'research', label: 'Research and development (academic, experimental)' },
      { value: 'community_focused', label: 'Nonprofit/social impact (mission-driven, community-focused)' },
    ],
    render: () => (
      <CheckboxQuestion
        label="What’s your ideal work environment?"
        options={[
          { value: 'startup_culture', label: 'Startup culture (fast-paced, innovative)' },
          { value: 'corporate_structure', label: 'Corporate structure (clear hierarchy, stability)' },
          { value: 'research', label: 'Research and development (academic, experimental)' },
          { value: 'community_focused', label: 'Nonprofit/social impact (mission-driven, community-focused)' },
        ]}
        selectedValues={formData.idealWorkEnvironment || []}
        onChange={(values) => handleInputChange('idealWorkEnvironment', values)}
      />
    ),
  },
  {
    id: 'industriesOfInterest',
    type: 'text',
    label: 'Which industries interest you most, regardless of your current field?',
    placeholder: 'Enter your industries of interest',
    render: () => (
      <TextQuestion
        label="Which industries interest you most, regardless of your current field?"
        value={formData.industriesOfInterest}
        placeholder="Enter your industries of interest"
        onChange={(e) => handleInputChange('industriesOfInterest', e.target.value)}
      />
    ),
  },
  {
    id: 'unconventionalAspect',
    type: 'text',
    label: 'What’s something unconventional you’d like to include in your future job?',
    placeholder: 'Enter your unconventional aspect',
    render: () => (
      <TextQuestion
        label="What’s something unconventional you’d like to include in your future job?"
        value={formData.unconventionalAspect}
        placeholder="Enter your unconventional aspect"
        onChange={(e) => handleInputChange('unconventionalAspect', e.target.value)}
      />
    ),
  },

  // Category 4: People and Places
  { type: 'category', label: 'Section 4: People and Places' },
  {
    id: 'admiredPerson',
    type: 'text',
    label: 'Is there a anyone you follow online that you admire? If so, what do you admire about them? E.g., Eric Floberg, a running YouTuber, because he gets to compete at a high level while also being a father of 4 and a filmmaker.',
    placeholder: "Enter the person's name and what you admire",
    render: () => (
      <TextQuestion
        label={'Is there a anyone you follow online that you admire? If so, what do you admire about them? E.g., Eric Floberg, a running YouTuber, because he gets to compete at a high level while also being a father of 4 and a filmmaker.'}
        value={formData.admiredPerson}
        placeholder="Enter the person(s) and what you admire"
        onChange={(e) => handleInputChange('admiredPerson', e.target.value)}
      />
    ),
  },
  {
    id: 'admiredFriends',
    type: 'text',
    label: 'Do you have a friend whose approach to their career and/or academics you admire or seek to emulate?',
    placeholder: 'Enter your admired friends',
    render: () => (
      <TextQuestion
        label="Do you have any friends whose approach to college and career you admire or seek to emulate?"
        value={formData.admiredFriends}
        placeholder="Enter your admired friends"
        onChange={(e) => handleInputChange('admiredFriends', e.target.value)}
      />
    ),
  },
  {
    id: 'preferredLocations',
    type: 'text',
    label: 'Are there cities or countries that you can envision yourself living and working in?',
    placeholder: 'Enter your preferred locations',
    render: () => (
      <TextQuestion
        label="Are there cities or countries that you can envision yourself living and working in?"
        value={formData.preferredLocations}
        placeholder="Enter your preferred locations"
        onChange={(e) => handleInputChange('preferredLocations', e.target.value)}
      />
    ),
  },
  {
    id: 'finalThoughts',
    type: 'text',
    label: 'Is there anything else you’d like to share about your career goals, passions, or current challenges?',
    placeholder: 'Write your answer here',
    render: () => (
      <TextQuestion
        label="Is there anything else you’d like to share about your career goals, passions, or current challenges?"
        value={formData.finalThoughts}
        placeholder="Write your answer here"
        onChange={(e) => handleInputChange('finalThoughts', e.target.value)}
      />
    ),
  },
]

export const getTotalQuestions = () => getQuestions({}, () => {}).length;