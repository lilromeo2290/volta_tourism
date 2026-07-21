import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyzeDesign() {
  const zai = await ZAI.create();
  const imgBuffer = fs.readFileSync('/home/z/my-project/upload/design-small.jpg');
  const base64 = imgBuffer.toString('base64');

  const response = await zai.chat.completions.createVision({
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe this website design mockup in extreme detail. I need: 1) All sections from top to bottom 2) Exact color scheme 3) Navigation design 4) Hero section layout 5) All card/section designs 6) Button styles 7) Typography 8) Footer design 9) Spacing patterns 10) Any special visual effects' },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` } }
        ]
      }
    ],
    thinking: { type: 'disabled' }
  });

  console.log(response.choices[0]?.message?.content);
}

analyzeDesign().catch(console.error);