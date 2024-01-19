"use client"

import { useForm } from 'react-hook-form';
import { Form, FormDescription, FormMessage, FormItem, FormControl, FormLabel, FormField } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent } from 'react';
import { Textarea } from "../ui/textarea";
import { useState } from 'react';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';
import { CommentValidation, ThreadValidation } from "@/lib/validations/thread";
import { addCommentToThread, createThread } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';




interface Props{
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}


const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
   const router = useRouter();
   const pathname = usePathname();

   const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
        thread: ''
    }
   })
   
   const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
     await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
     form.reset();
   
    router.push("/")
   }
   
    return (
    
        <Form {...form}>
           <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
               <FormField  
                 control={form.control}
                 name='thread'
                 render={({ field }) => (
                    <FormItem className='flex w-full items-center gap-3'>
                      <FormLabel className='text-base-semibold text-light-2'>
                        <Image  
                        src={currentUserImg}
                        alt="Profile image"
                        width={48}
                        height={48}
                        className='rounded-full object-cover'
                        />
                       </FormLabel>
                       <FormControl className="border-none bg-transparent">
                         <Input  
                           type="text"
                           placeholder='Enter comment...'
                           className="no-focus text-light-1 outline-none"
                           {...field}
                         />
                        </FormControl>  
                    </FormItem>
                 )} 
               />

               <button type='submit' className='comment-form_btn'>
                Reply
               </button>
            </form> 
        </Form>
    )
}

export default Comment;