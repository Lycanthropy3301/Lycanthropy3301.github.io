class InteractiveGraph {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.scale = 1;

        this.createGraph();
        this.addEventListeners();
    }

    animateRadius(circle, startRadius, endRadius, duration) {
      const startTime = performance.now();

      const updateRadius = () => {
          const elapsedTime = performance.now() - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const currentRadius = startRadius + (endRadius - startRadius) * progress;
          circle.setAttribute("r", currentRadius);

          if (progress < 1) {
              requestAnimationFrame(updateRadius);
          }
      };

      requestAnimationFrame(updateRadius);
    }

    addEventListeners() {
        const svg = this.container.querySelector(".graph");

        svg.addEventListener("click", event => {
            const target = event.target;
            if (target.classList.contains("node")) {
                const nodeId = parseInt(target.getAttribute("data-id"));
                this.displayText(nodeId);

                const allNodes = svg.querySelectorAll(".node");
                allNodes.forEach(node => {
                    node.classList.remove("highlighted");
                });

                target.classList.add("highlighted");
            }
        });

    }

    createGraph() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "graph");
      svg.style.width = "100%";
      svg.style.height = "500px";

      this.data.forEach((node, index) => {
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("class", "node");
          circle.setAttribute("cx", node.x);
          circle.setAttribute("cy", node.y);
          circle.setAttribute("r", 10); // Initial radius
          circle.setAttribute("data-id", node.id);

          circle.addEventListener("mouseover", () => {
              this.animateRadius(circle, 10, 15, 300);
          });
          circle.addEventListener("mouseout", () => {
              this.animateRadius(circle, 15, 10, 300);
          });

          svg.appendChild(circle);
      });

      for (let i = 1; i < 3; i++) {
          const prevNode = this.data[i - 1];
          const node = this.data[i];

          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("class", "connector");
          line.setAttribute("x1", prevNode.x);
          line.setAttribute("y1", prevNode.y);
          line.setAttribute("x2", node.x);
          line.setAttribute("y2", node.y);
          line.setAttribute("style", "stroke:red;stroke-width:2")
          svg.appendChild(line);
      }

      this.container.appendChild(svg);
      setTimeout(() => {
        const firstNode = svg.querySelector(".node");
        if (firstNode) {
            firstNode.classList.add("highlighted");
        }
    }, 100);
    }

    displayText(nodeId) {
        const textHeading = {
          1: 'Core',
          2: 'Perspective',
          3: `Limbo`
        }
        const textContent = {
            1: `Inside every individual is a core. Some people consider it to be their hearts, a driving force carrying them through their lives using primarily intuition and willpower. Others consider their core to be their brain, paving a clear-cut path through life using logic and reason. Both interpretations are perfectly valid, and the extent to which one person prefers to use either their brain or heart always varies on a spectrum.

A person's position on that spectrum can change. Contrary to popular belief, I believe a person's position on that spectrum can change within seconds, varying from decision to decision. What influences the position itself is a monumentally complex question that has more conceivable answers than can fit on this page. Just to list a few examples: a person's mood, surroundings, relations, ideals, financial standing, social standing, upbringing, etc.

But one thing that rarely changes is a person's perceived position on that spectrum. Ask someone if they use their head more than their heart, and their answer most likely will not change the day after or the day after that. Unless, of course, an event of great significance took place. This perceived position is a major contributor to their self-image or personality.

Now, how does this relate to cybersecurity? One of the multitude of reasons I found some concepts in this field difficult to grasp is because I saw security as a field of pure logic and reason. Either a system is secure or it isn't. Either this file is spyware or it isn't. Either this security definition is correct or it isn't.

Security is as largely an emotional field as it is logical. Where logic fails to reveal what went wrong, intuition can guide people straight to an answer. Where all routes seem to have been tried and tested, willpower can manifest and inspire another attempt to find the truth. Security, just like humans, changes its position on that brain-heart spectrum every second.

There is no obvious answer to security, and there probably will never be, but that's a good thing. That volatility keeps this field alive and interesting. The blossoming of life itself is a slap in the face of existence—a cosmic miracle so complex and nuanced that it's impossible to understand. Yet, life is arguably the most beautiful thing in this dark void of a universe we live in. 

So, it's okay to not understand. It's okay to not comprehend. It's alright if what works now won't work again. What makes security so interesting and beautiful is its ability to change and adapt, like the people that drive it. As I've grown, that has only become more apparent to me, thus bringing me peace in times where nothing seems to go the way I expected it to.

I'm sure that perspective would bring you peace too.`,

            2: `My perspective changes, and my brain seems to be swimming with thoughts. I seem to understand people a bit better, as I understand code a bit better too. Code, for some people, is a fragment of themselves. As it is with any creation. Code can be a materialization of the creative, wandering mind. As I've grown, I have come to see that freedom of discovery, that freedom of exploring every avenue of those interests.

I've been doing quite a few HTB sherlocks, playing around with volatility. The hunting for clues provided a window into my own soul, and the transparency of someone's actions on a system was surprising to me. In a way, a computer is an extension of you. It does nothing without human intervention and is absolutely worthless on its own. In the midst of automation and AI, it's easy to forget that computers were made for humans, and so much can be derived and assumed from a computer owner just by
poking around. 

Cybersecurity is easy to learn in breadth, due to its engaging nature and adjustable pace. However, mastering cybersecurity requires you to understand it, and that can take years. Cybersecurity, being such a human thing—existing to protect the owners behind soulless computers—intersects with our lives in surprising ways. Hence, mastering cybersecurity demands the understanding of humans themselves.

Security is complex because it means so many things to so many different people. It's complex because of the multifaceted nature of humans, which creates multiple avenues for exploitation. Modern cybersecurity is the culmination of human knowledge and understanding of the computers we use, intersecting with algorithmic nuances to weave a fascinating and ever-so-complex web of digital systems engineered to keep us safe and secure.

In cybersecurity, failures are devastating, while success is never guaranteed to last. I realize that as I expand my knowledge, filling in gaps I never knew existed. So instead of focusing on my knowledge of security, I take pleasure in my ever-increasing understanding of the field. In that way, even setbacks become teachers, while success becomes ever more flavorful.

That is why I code; I explore and seek to understand, even if it may not be optimal. I value the freedom, and I value the understanding. I hold the knowledge I learned close to my heart, but I do not fret if it happens to slip. With my understanding of the world, I will understand what protects it. By understanding how people like you and me go about their lives, I will understand what needs to be protected and how we can protect it. That, I believe, is the type of cybersecurity learning that lasts.`,

            3: `Whatever place I am in right now, it seems like not much is left to do. All this feels like a strange waiting period, waiting for life to resume. After graduating, getting all my college results, I just don't have anything to really look forward to.

Except I do, just struggle to remind myself about it. The place I stay in is comfortable, but doesn't inspire motivation. Sure, improving myself and building valuable skills in cybersecurity seems like the obvious way forward here. My story would essentially write itself, as I continue to work every single day towards the ultimate goal of a better me.

It sounds perfect on paper, moving to a remote location and grinding for hours on end to come out a productivity machine. But, that isn't how I feel right now. Nothing holds me back, instead it feels like the vivid painting of my perfect future has lost it's colour. Programming seems tedious, and building that envisioned digital resume suddenly feels like a waste of time.

Realise it's okay to feel stuck. It's alright to be in Limbo, the state in between worlds. In this case, the worlds being the state of unrestricted productivity and the equal yet opposite state of demotivation caused by situational shackles.

My advice? Your life hasn't take a stop at Limbo for no reason. Maybe it's time to take a break, smell the flowers and take in the world around you before you take another step forward. Your physical journey of improvement and success temporarily halts, waiting for emotional growth and self discovery. Evaluate how far you've come, plan your next steps, try something different.

This period of your life is here to stay, so try not to think about it too much. I should have realised it once I turned 18, but the time I have before I move onto the next stage of my life is precious and short. It's okay to cherish it a little, it's okay to take the back seat and contemplate.

Take a look around, and simply observe. Then, you'll realise maybe Limbo isn't such a bad place to be after all.`
        };

        const text = textContent[nodeId];
        if (text) {
            const textContentDiv = document.getElementById("text-content");
            textContentDiv.innerHTML = "";
            const paragraphs = text.split("\n\n");
            paragraphs.forEach(paragraph => {
                const p = document.createElement("p");
                p.textContent = paragraph;
                textContentDiv.appendChild(p);
            });
        } else {
            console.error(`Text content not found for node ${nodeId}`);
        }

        document.getElementById("key-title").textContent = textHeading[nodeId];
    }
}

const data = [
    { id: 1, x: 350, y: 50 },
    { id: 2, x: 200, y: 150 },
    { id: 3, x: 450, y: 250 }
];

const interactiveGraph = new InteractiveGraph("graph-container", data);
