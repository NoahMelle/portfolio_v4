import React from 'react'
import { getProject } from '@/data/fetcher'
import { ProjectType } from '@/lib/types'
import Image from 'next/image';

export default async function Project({ params }: { params: { slug: string } }) {
  const project: ProjectType = await getProject(params.slug);

  console.log(project)

  return (
    <div>
      <Image 
        src={project.screenshots[0].url}
        alt='Screenshot'
        width={500}
        height={500}
    />
    </div>
  )
}
