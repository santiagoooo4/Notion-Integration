import { Client } from "@notionhq/client";

const Page = ({pageNotion}) => {
    return <pre>{JSON.stringify(pageNotion, null, 2)}</pre>
};

export const getStaticPaths = async () => {
    const notion = new Client({
      auth: process.env.NOTION_SECRET,
    });
  
    const data = await notion.blocks.children.list({
        block_id: process.env.PAGE_ID,
      });
        
    const paths = [];
    
    data.results.forEach((result) => {
        if (result.type === "child_page") {
          paths.push({
            params: {
              id: result.id,
            },
          });
        }
      });
      return {
        paths,
        fallback: false,
      };

}

export const getStaticProps = async ({ params: { id } }) => {
    // fetch details for recipe
    const notion = new Client({
      auth: process.env.NOTION_SECRET,
    });
  
    const page = await notion.pages.retrieve({
      page_id: id,
    });
  
    const blocks = await notion.blocks.children.list({
      block_id: id,
    });

    const titlePage = page.properties.title.title[0].plain_text;
    const titles = []; 
    const contentUL = []; 
    const contentOL = []; 

    // blocks.results.forEach((block) => {
    //     if (block.type === "bulleted_list_item") {
    //       contentUL.push(block.bulleted_list_item.text[0].plain_text);
    //     }
    
    //     if (block.type === "numbered_list_item") {
    //       contentOL.push(block.numbered_list_item.text[0].plain_text);
    //     }
    //   });

    blocks.results.forEach((block) => {
        if (block.type === "heading_1") {
          titles.push(block.heading_1.rich_text[0].plain_text);
        }
        if (block.type === "bulleted_list_item") {
          contentUL.push(block.bulleted_list_item.rich_text[0].plain_text);
        }
    
        if (block.type === "numbered_list_item") {
          contentOL.push(block.numbered_list_item.rich_text[0].plain_text);
        }
      });

    return {
        props: {
            // pageNotion: blocks,
            pageNotion: {
                titlePage,
                titles,
                contentUL,
                contentOL,
            }
        }
    }
}

export default Page;