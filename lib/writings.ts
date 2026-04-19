export type Writing = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
};

const writings: Writing[] = [
  {
    id: "understanding-docker",
    title: "Docker: The Superpower of Consistent Environments",
    excerpt:
      "What Docker really is and why it solves the 'works on my machine' problem once and for all.",
    date: "February 2025",
    readTime: "12 min read",
    content: `So, what is Docker? Docker is a container platform that gives us the superpower of running the same environment on every laptop or system. Let me tell you why this matters.

## The Problem We All Face

Imagine this: I'm developing an application. I've installed all the dependencies my code needs, specific versions of libraries, everything works perfectly on my local machine. After a year, I want to collaborate with my friend Skanda. I give him my GitHub link, and he clones it.

But here's where things go wrong. Skanda might face problems right from the start — version mismatches, missing dependencies, and he's on Windows while I'm on Linux. We can't just run the code on the first try because there will be issues. Sound familiar?

## The Docker Solution

If I used Docker in my codebase, Skanda would simply pull my Docker image and run it on his machine. Using this approach, the exact versions, the same code, and all dependencies running in my environment will also run in his environment without any errors. That's the beauty of Docker.

## Getting Started with Docker

When you install Docker, you can check if it's running by typing \`docker\` in your terminal. You can also use \`docker -v\` to check the version.

Let's install your first image:

\`\`\`bash
docker run -it ubuntu
\`\`\`

What does this command do? We're telling Docker to run in interactive mode (\`-it\`) and use Ubuntu. First, Docker looks for an image named "ubuntu" on your system. If it finds it, great! If not, it downloads the image from Docker Hub.

## About Docker Hub

hub.docker.com is like GitHub.com. Just like how we add code to GitHub and people can pull it, we can pull public images from Docker Hub. It's that simple.

Once you have the image, run the command again. This time, Docker serves the cached Ubuntu image and creates a new container. The cool thing? Once you're inside the container, you can do literally anything, and it doesn't affect your actual system. That's isolation at its best.

## Docker Networking

Containers are isolated by default — they can't talk to other containers or access the internet. But when you spin up a container, Docker creates a bridge network between the host network and the container's IP address.

How does it work? When Docker starts, it sets up these configs on your host machine:
- It creates a virtual ethernet bridge named \`docker0\` on your host
- It connects all containers together through this bridge
- It connects them to your host network

## Docker Volumes: Persisting Your Data

Here's the thing about containers — they're isolated, and when a container is killed, all its data is gone. That's where Docker volumes come in.

Docker volumes are used for storing and persisting data even if the container is killed or removed. When you spin up a new container, you can mount it to the same volume. Whatever data is in the volume gets synced to the container again.

## Example Dockerfile

Here's a simple Dockerfile I use in my projects:

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm install
RUN npm run db:generate
RUN npm run build

CMD ["npm", "run", "start-user-app"]
\`\`\`

## Docker Compose: Running Multiple Containers

Docker Compose is a higher-level tool where you can run your entire codebase with one command. Multiple containers can be networked in the same network, share volumes, and it's perfect for production apps.

\`\`\`yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
    volumes:
      - ./src:/usr/src/app/src

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

Instead of running multiple \`docker run\` commands, you define everything in one file and use \`docker-compose up\`. This starts all your services together with proper networking and volumes configured.

Docker isn't just a tool; it's a way of thinking about how we build and deploy applications. Once you start using it, you'll wonder how you ever lived without it.`,
  },
  {
    id: "cicd-pipelines-explained",
    title: "CI/CD Pipelines: From Code to Production",
    excerpt:
      "A practical guide to understanding how continuous integration and deployment actually works in real projects.",
    date: "January 2025",
    readTime: "15 min read",
    content: `Let me break down CI/CD at a high level based on what I've learned and implemented in my projects.

## The Branch Strategy

Whenever we create a repo, we make certain branches — typically \`dev\` for development and \`prod\` for production. This separation is crucial for maintaining stability.

## How CI Pipelines Work

Whenever a user makes changes to the dev branch, the CI (Continuous Integration) pipeline gets triggered. Here's what happens:

The CI pipeline builds the repo on an \`ubuntu-latest\` machine (usually GitHub's runners). It checks for workflows and linting errors. If the PR passes all the workflows — building the repo without errors and being free from linting and formatting issues — only then is it pushed to the dev branch.

Once every two weeks or so, all the PRs in the dev branch are reviewed. If everything is correct and working as expected, they're pushed to the prod branch.

## The CD Pipeline Takes Over

This is where CD (Continuous Deployment) comes into play. Here's the flow:

1. The repo is cloned using \`actions/checkout@v2\` on an \`ubuntu-latest\` machine
2. If everything builds correctly, a Docker image is created
3. This Docker image is pushed to a Docker registry (or AWS ECR)
4. Using Kubernetes clusters, containers are created from this image
5. These containers are deployed to an EC2 machine and scaled up or down based on traffic

## Build Workflow (build.yml)

\`\`\`yaml
name: Build on PR

on:
  pull_request:
    branches:
      - master
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm install

      - name: Generate Prisma Client
        run: npm run db:generate

      - name: Run Build
        run: npm run build
\`\`\`

This workflow runs on every pull request. It checks out the code, installs dependencies, generates the Prisma client, and runs the build. If any step fails, the PR can't be merged.

## Deploy Workflow (deploy.yml)

\`\`\`yaml
name: Build and Deploy to Docker Hub

on:
  push:
    branches:
      - master

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Check Out Repo
        uses: actions/checkout@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v1
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v2
        with:
          context: .
          file: ./docker/Dockerfile.user
          push: true
          tags: toovinod/cicd-pipelines:latest

      - name: Verify Pushed Image
        run: docker pull toovinod/cicd-pipelines:latest
\`\`\`

## The Big Picture

So to summarize: code changes trigger CI pipelines that test and validate. When code hits production branches, CD pipelines build Docker images, push them to registries, and deploy them to servers where they can scale based on demand.

Understanding this flow changed how I think about shipping software. Every push isn't just pushing code — it's triggering a chain of automated processes that ensure quality before anything reaches your users.`,
  },
  {
    id: "websockets-backend-communication",
    title: "WebSockets and Advanced Backend Communication",
    excerpt:
      "How production systems use message queues, pub/sub, and WebSockets to build scalable microservices that don't fall apart under pressure.",
    date: "March 2025",
    readTime: "18 min read",
    content: `In production applications, we don't just have one big backend doing everything. We break our backend into multiple services, and these services talk to each other in fascinating ways.

## The PhonePe Problem

Let's start with a real example. Imagine I'm sending 200 rupees to my friend through PhonePe. The money transfer needs to happen immediately — that's the core flow. But PhonePe also sends notifications and SMS confirmations.

Here's where things get tricky. If we build everything in one backend and the SMS service goes down, suddenly our entire payment system is affected. Users can't send money because we're waiting for the SMS service to respond. That's a terrible user experience.

The notification service being down shouldn't stop people from sending money. That's where microservices architecture comes in.

## Enter Message Queues

When a request comes in, it reaches our primary backend. The money deduction and addition happens immediately — that's synchronous and critical. But for services like SMS and notifications? We use a queue.

Think of a queue like a todo list. Our primary backend says "hey, I need to send an SMS to this user" and puts that job in the queue. Then it moves on. It doesn't wait. A separate worker service picks up jobs from the queue and handles them one by one.

The beauty? Money transfers happen instantly. Notifications can take their own time. If the notification worker crashes, users can still send money.

## The LeetCode Architecture

When you submit a solution on LeetCode, here's what happens:

1. The request hits LeetCode's primary backend
2. The backend (producer) puts a job in a queue with: userId, problemId, code, language
3. A worker picks up the job and executes the code in an isolated container

Why not execute code in the primary backend? Two reasons:

**Security**: We're running untrusted user code. Workers run in isolated containers — sandboxed. If something goes wrong, we just kill that worker.

**Reliability**: What if the code has \`while(true)\`? Our primary backend would be stuck, and other users would suffer. Workers are isolated from this problem.

## Types of Communication

**Synchronous:**
- *HTTP/HTTPS*: Service A sends a request, waits for Service B to respond.
- *WebSockets*: Start as HTTP, then upgrade. Allow full-duplex communication — both sides can send messages anytime without reopening connections.

**Asynchronous:**
- *Message Queues (Redis, RabbitMQ)*: Producer adds jobs, consumers pick them up when ready. Producer doesn't wait.
- *Pub/Sub*: Publishers send messages, all subscribers receive them. Great for scaling.

## The Full LeetCode Flow

1. You submit code
2. Primary backend puts job in queue
3. Worker executes code in isolated container
4. Worker publishes result to pub/sub
5. WebSocket server subscribed to pub/sub receives the result
6. WebSocket server sends event to your browser

**Why can't workers talk to browsers directly?**

Workers are isolated by design — they should never have direct access to clients. They're also short-lived; they scale up and down and might die before sending a result. Pub/sub decouples them entirely.

## How Redis Handles Crashes

Redis has two persistence strategies:

*AOF (Append Only File)*: Every write operation is logged to disk. If Redis crashes, we replay the log. Downside: large files take time to replay.

*RDB (Redis Database Backup)*: Redis takes periodic snapshots creating a binary file. Recovery is fast but you might lose data between snapshots.

## Scaling WebSocket Servers

In production, we have many WebSocket servers distributed geographically. Indian users connect to Indian servers, US users to US servers — lower latency.

But if Vinod (India) and a friend (USA) are in the same room on different servers, how does a message from Vinod reach the friend?

Workers just publish messages to pub/sub. All WebSocket servers subscribe. Whichever server has your friend connected receives the message and forwards it. That's how we scale globally.

Modern production systems aren't monoliths. They're distributed systems with synchronous communication for critical operations, asynchronous queues for non-critical tasks, pub/sub for scaling across servers, and WebSockets for real-time communication. Understanding these patterns changed how I think about building applications.`,
  },
];

export function getAllWritings(): Writing[] {
  return writings;
}

export function getWritingById(id: string): Writing | undefined {
  return writings.find((w) => w.id === id);
}

export function getRecentWritings(count: number = 5): Writing[] {
  return writings.slice(0, count);
}

export function getAllWritingIds(): string[] {
  return writings.map((w) => w.id);
}
