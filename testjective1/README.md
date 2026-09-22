# EduPilot AI

Build a modern web application called EduPilot AI — an AI-powered teaching assistant platform for teachers and students.

The goal of the product is to help teachers prepare lessons, generate assessments, analyze student performance, detect learning gaps, and automatically create adaptive follow-up lessons.

This is not just a chatbot. The application should visually demonstrate an AI agent workflow that analyzes class data and decides what action should be taken next.

Use a modern SaaS-style UI.

TECH STACK

Use:

React

TypeScript

Tailwind CSS

Supabase for database and authentication

Supabase Storage if files are needed

Clean component architecture

Responsive desktop-first design

Use mock AI responses initially if real AI API integration is not configured yet.

The application must be structured so that OpenAI API integration can easily be added later.

PRODUCT NAME

EduPilot AI

Tagline:

"AI Teaching Agent that plans, assesses, understands and adapts."

TARGET USERS

There are two user roles:

Teacher

Student

For the hackathon MVP, Teacher is the main role.

AUTHENTICATION

Create:

Login page

Sign up page

Role selection

Teacher account

Student account

For demo purposes also provide:

"Continue as Demo Teacher"

and

"Continue as Demo Student"

Teacher demo credentials should automatically open a pre-filled demo class.

MAIN TEACHER DASHBOARD

Create a dashboard with sidebar navigation.

Sidebar:

Dashboard

My Classes

Lessons

Students

Assessments

Analytics

AI Agent

Settings

Main dashboard should show:

Welcome message:

"Good morning, Dana"

Cards:

Total Students
25

Active Classes
3

Average Mastery
72%

Learning Gaps
2

Display a class card:

Class 8A
Subject: Informatics
25 students
Current topic: Python Loops

Show topic mastery:

Variables — 87%
Conditions — 79%
Loops — 61%
range() — 38%
Nested Loops — 32%

Mark low mastery topics with warning icons.

Show an AI Insight card:

"Learning gap detected"

Example:

"14 of 25 students have difficulty understanding Python range()."

Buttons:

Analyze Class
Ask AI Agent
Generate Intervention

CLASS PAGE

Create page:

Class 8A

Show:

Number of students

Subject

Current unit

Current topic

Average score

Learning gaps

Recent assessments

Create tabs:

Overview
Students
Skills
Assessments
AI Insights

OVERVIEW TAB

Show:

Class mastery overview

Skill cards:

Variables
Conditions
Loops
range()
Nested Loops

Each skill should have mastery percentage.

Example:

Variables 87%
Conditions 79%
Loops 61%
range() 38%
Nested Loops 32%

Display:

AI detected problems

Example:

"56% of the class misunderstand how range() works."

STUDENTS TAB

Create student table.

Columns:

Name
Overall Mastery
Loops
range()
Last Score
Status

Example students:

Aruzhan — 78%
Dias — 65%
Amina — 91%
Timur — 54%
Aliya — 84%
Nursultan — 49%
Dana — 76%
Miras — 60%

Use different mastery values.

Statuses:

On Track
Needs Attention
At Risk

Clicking a student opens Student Profile.

STUDENT PROFILE PAGE

Show:

Student name

Overall mastery

Skill mastery chart

Example:

Variables 90%
Conditions 82%
Loops 54%
range() 31%
Nested Loops 20%

Show:

Recent mistakes

Common misconception

Learning recommendations

AI recommendation example:

"Aruzhan appears to misunderstand that Python range(5) starts from 0 and does not include 5."

Buttons:

Generate Practice
Generate Personal Learning Plan
View Assessment History

AI AGENT PAGE

This is one of the most important pages.

Design a chat-style interface but make it clearly different from a normal chatbot.

Header:

AI Teacher Agent

Subtitle:

"Analyzes your classroom and decides what action should happen next."

Teacher can type:

"Prepare tomorrow's lesson based on today's quiz."

When teacher sends this message, show an animated agent workflow.

Example agent execution:

Step 1
Analyzing class performance...
Completed

Step 2
Detecting knowledge gaps...
Completed

Step 3
Reading curriculum objectives...
Completed

Step 4
Creating lesson structure...
Completed

Step 5
Generating differentiated activities...
Completed

Step 6
Creating exit quiz...
Completed

After processing, show:

"Lesson prepared"

AI summary:

"I analyzed the most recent assessment. 14 of 25 students struggle with range(). I recommend reviewing range() before introducing nested loops."

Buttons:

Open Lesson
Generate Worksheet
Generate Quiz
Modify Plan

The UI should make it visually obvious that an AI agent is performing multiple tasks.

LESSON GENERATOR

Create a page called:

Create Lesson

Form fields:

Class
Grade
Subject
Topic
Lesson duration
Difficulty
Learning objective

Example values:

Class: 8A
Grade: 8
Subject: Informatics
Topic: Python For Loops
Duration: 45 minutes

Button:

Generate Lesson with AI

When clicked, show AI Agent processing steps.

Generated lesson should contain:

Lesson title

Learning objective

Lesson duration

Required materials

Lesson structure

Example:

0–5 min
Warm-up

5–12 min
Concept explanation

12–20 min
Teacher live coding

20–32 min
Student practice

32–40 min
Challenge exercise

40–45 min
Exit quiz

Add buttons:

Edit Lesson
Regenerate
Generate Exercises
Generate Quiz
Export

DIFFERENTIATED EXERCISES

Create three sections:

Beginner

Intermediate

Advanced

Example Beginner task:

"What numbers will this code print?"

for i in range(5):
print(i)

Example Intermediate:

"Write a program that prints numbers from 1 to 10 using a for loop."

Example Advanced:

"Write a program that calculates the sum of numbers from 1 to N using a for loop."

Teacher should be able to regenerate each difficulty level independently.

ASSESSMENT GENERATOR

Create page:

Create Assessment

Fields:

Class
Topic
Number of questions
Difficulty
Question types

Question types:

Multiple Choice
Short Answer
Code Question
True / False

Button:

Generate Assessment

Generate a sample assessment about Python loops.

Example question:

"What does range(3) generate?"

A:
1,2,3

B:
0,1,2

C:
0,1,2,3

Correct answer:
B

Teacher can:

Edit
Delete
Regenerate
Add Question
Publish Assessment

STUDENT QUIZ VIEW

Create a clean student interface.

Student sees:

Today's Quiz
Python Loops

Question 1 of 5

Question:

What will the following code print?

for i in range(3):
print(i)

Options:

1 2 3
0 1 2
0 1 2 3

Button:

Submit Answer

After answering, show immediate feedback.

Example incorrect answer feedback:

"Not quite."

Then:

"You may be assuming that range(3) starts at 1. In Python it starts at 0."

Show:

Concept:
range()

Button:

Try Similar Question

ASSESSMENT ANALYSIS

Teacher should have an Assessment Results page.

Show:

Average score
68%

Students completed
25/25

Questions with most mistakes

Show:

Question 3
Correct answers: 44%

Skill:
range()

AI Insight:

"14 students selected 1,2,3 instead of 0,1,2."

Detected misconception:

"Students believe range(n) starts from 1."

Button:

Generate Intervention

CLASS ANALYTICS

Create Analytics page.

Show charts for:

Class mastery by skill

Student performance distribution

Recent assessment scores

Weakest skills

Students needing attention

Use cards and simple charts.

Show:

Top learning gap

range()
38% mastery

AI Recommendation:

"Review range() before moving to nested loops."

Show button:

Generate Adaptive Lesson

ADAPTIVE LESSON / INTERVENTION

When teacher clicks Generate Intervention:

AI Agent should simulate:

Analyzing misconception
Creating explanation
Creating practice exercises
Creating mini quiz

Then show:

Intervention Lesson

Goal:

"Correct misunderstanding of Python range()."

Duration:

10 minutes

Content:

Visual explanation

Teacher example

Guided exercise

Student practice

Mini quiz

Create button:

Add to Next Lesson

AI INSIGHTS PANEL

Throughout the platform, create reusable AI Insight cards.

Examples:

"14 students struggled with range()."

"Loops mastery increased by 12% this week."

"5 students may need additional practice."

"Most common misconception: students expect range(n) to include n."

Use icons and visually distinct cards.

DATABASE STRUCTURE

Create Supabase tables approximately like this:

users

id
name
email
role
created_at

classes

id
name
grade
subject
teacher_id

students

id
user_id
class_id
name

skills

id
name
subject

student_skills

id
student_id
skill_id
mastery_score
updated_at

lessons

id
class_id
title
topic
learning_objective
duration
content
created_at

assessments

id
class_id
lesson_id
title
topic
created_at

questions

id
assessment_id
question_text
question_type
correct_answer
skill_id

student_answers

id
student_id
question_id
answer
is_correct
created_at

ai_insights

id
class_id
student_id
type
title
description
confidence
created_at

learning_gaps

id
class_id
skill_id
mastery_score
affected_students
created_at

SEED DEMO DATA

Automatically generate demo data.

Teacher:

Dana

Class:

8A

Subject:

Informatics

Topic:

Python Loops

Number of students:

25

Generate realistic student mastery scores.

Important learning gap:

range()

Mastery:
38%

Affected students:
14

Nested loops:

32%

Create recent quiz results so analytics pages are populated.

AI AGENT FUNCTIONS

Prepare frontend functions or placeholders for the following backend/AI functions:

getClassResults()

getStudentProfile()

getSkillMastery()

analyzeLearningGaps()

getCurriculum()

generateLessonPlan()

generateDifferentiatedExercises()

generateAssessment()

gradeStudentAnswer()

detectMisconception()

updateStudentMastery()

generateStudentLearningPlan()

generateClassInsight()

generateInterventionLesson()

generateNextLessonRecommendation()

Even if AI is mocked, structure the application as if these functions will later call an OpenAI agent.

AI AGENT LOGIC

The AI Agent should conceptually work like this:

Teacher request

→ Analyze teacher intent

→ Retrieve class data

→ Retrieve student performance

→ Detect learning gaps

→ Retrieve curriculum requirements

→ Decide next teaching action

→ Generate lesson / assessment / intervention

→ Present recommendation to teacher

OPENAI INTEGRATION PLACEHOLDER

Create a service file for future OpenAI integration.

Example architecture:

services/aiAgent.ts

Include functions:

analyzeClass()

generateLesson()

generateQuiz()

gradeAnswer()

detectMisconception()

generateIntervention()

For now these can return mock responses.

Do not expose API keys in frontend code.

Use environment variables and server-side functions when real integration is added.

DESIGN

Design should feel like:

modern education SaaS
clean
professional
minimal
AI-focused

Use:

large white cards
subtle shadows
rounded corners
modern charts
clear typography
soft gradient accents

Primary visual style:

white / light gray background
dark text
blue or indigo AI accents

Avoid cartoon-like design.

Use responsive layout.

Create polished empty states, loading states, hover states and skeleton loaders.

AI PROCESSING ANIMATION

When AI performs tasks, show a beautiful vertical execution timeline.

Example:

Analyzing class data
✓

Detecting learning gaps
✓

Checking curriculum
✓

Creating lesson
Loading...

Generating quiz
Waiting

This component should be reusable across the application.

IMPORTANT PRODUCT PRINCIPLE

Do NOT design the product as only a ChatGPT clone.

The main value must be visible through:

teacher workflow
student data
analytics
agent actions
adaptive lessons
automated recommendations

The system should visually demonstrate this cycle:

PLAN
↓
TEACH
↓
ASSESS
↓
UNDERSTAND
↓
ADAPT
↺

HOME / LANDING PAGE

Create a simple landing page.

Hero:

"Your AI Teaching Agent"

Subtitle:

"Plan lessons, understand your students and automatically adapt what you teach next."

Buttons:

Try Demo
Sign In

Below hero show four features:

Plan
Generate lessons aligned with student needs.

Assess
Create and evaluate assessments.

Understand
Detect misconceptions and learning gaps.

Adapt
Automatically create personalized follow-up instruction.

DEMO FLOW

The application should support this complete demo:

Open Teacher Dashboard.

Show Class 8A.

Show weak skill range() at 38%.

Open AI Agent.

Teacher types:
"Prepare tomorrow's lesson based on today's quiz."

Show AI workflow execution.

AI detects range() learning gap.

AI generates adaptive lesson.

Open generated lesson.

Show differentiated exercises.

Open student quiz.

Student answers incorrectly.

AI detects misconception.

Return to teacher analytics.

Show updated AI insight.

The whole demo should feel like one connected product.

PRIORITY

If there is not enough time to implement everything, prioritize in this order:

Teacher Dashboard

Class Analytics

AI Agent workflow

Lesson Generator

Assessment Results

Student Quiz

Student Profile

Authentication

Settings

The first five must look polished and functional.

Make all navigation work.

Do not create placeholder buttons that do nothing when the feature can be simulated.

For AI functionality without backend integration, create realistic mock workflows and sample generated results.

The final result should look like a production-quality hackathon MVP that can later be connected to OpenAI APIs.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ai-class-navigator-54.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4abc4da2-4578-5afa-b853-3d327a95c15d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
