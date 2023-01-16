import {Client} from "@notionhq/client"


const IntegrationPage2 = ({pages}) => {
    return <div>
                <pre>{JSON.stringify(pages, null, 2)}</pre>
           </div>;
};

export const getStaticProps = async () => {
    const notion = new Client({
      auth: process.env.NOTION_SECRET,
    });

    const data = await notion.blocks.children.list({
        block_id: process.env.PAGE_ID,
      });

      

    return {
        props: {
            pages: data,
        },
    }
} 

export default IntegrationPage2;