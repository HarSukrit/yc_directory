import Image from "next/image";
import styles from "./page.module.css";
import SearchForm from "@/app/components/SearchForm";
import StartupCard from "@/app/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

import { StartupTypeCard } from "@/app/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: {
  searchParams: Promise<{ query?: string }>
}) {
const query=(await searchParams).query;
const params={search:query || null};
const session=await auth();
const {data:posts}=await sanityFetch({query:STARTUPS_QUERY,params});//it will revalidate the page when any new changes happen.

  return (<>
  <section className="pink_container" >
    <h1 className="heading" >Pitch your startup,<br/>connect with entrepreneurs </h1>
    <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Notices in Virtual Competitions.</p>
    
  <SearchForm  query={query}/>
  
  </section>
 <section className="section_container">
    <p className="text-30-semibold">
      {query?`Search results for ${query}`:
      "All Startups"}

    </p>
    <ul className="mt-7 card_grid">
      {posts?.length>0 ?
      posts.map((post:StartupTypeCard)=>(
        <StartupCard key={post._id} post={post}/>
      )):<div></div>}
    </ul>
 </section>
 <SanityLive />
</>
  );
}
