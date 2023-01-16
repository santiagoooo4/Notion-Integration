import {Client} from "@notionhq/client"
import Link from "next/link";

const IntegrationPage = ({pages}) => {
    return pages.map((page) => (
        <p key={page.id}>
            <Link href={`/pages/${page.id}`}>
                {page.title}
            </Link>
        </p>
        ));
};

export const getStaticProps = async () => {
    const notion = new Client({
      auth: process.env.NOTION_SECRET,
    });

    const data = await notion.blocks.children.list({
        block_id: process.env.PAGE_ID,
      });

      const pages = [];

    data.results.forEach((result) => {
     if (result.type === "child_page") {
         pages.push({
            id: result.id,
            title: result.child_page.title});
        }
     });

    return {
        props: {
            pages,
        },
    }
} 

export default IntegrationPage;