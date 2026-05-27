import React , { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button , Input , Select , TextEditor } from '../index'
import databaseService from '../../appwrite_services/database'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({post}) => {
  
  const {register , handleSubmit , watch , setValue , getValues , control} = useForm({
    defaultValues : {
      title : post?.title || "",
      slug : post?.slug || "",
      content : post?.content || "",
      status : post?.status || "active"
    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  const submit = async (data) => {

    // updating existing post
    if (post) {
      // returns file id
      const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null

      // delete image if user uploaded new image
      if (file) {
        databaseService.deleteFile(post.featuredImage)
      }

    // update image
    const dbPost = await databaseService.updatePost(post.$id , {
      ...data,
      userId : userData.$id,
      featuredImage : file ? file.$id : undefined,
      authorName : userData.name,
    })

      // navigate to post
      if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
      }

      // post image
    } else {
      const file = await databaseService.uploadFile(data.image[0])

      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId

        const dbPost = await databaseService.createPost({
          ...data,
          userId : userData.$id,
          authorName : userData.name
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback( (value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/[^a-zA-Z\ d\s]+/g, "-").replace(/\s/g, "-")
    }
    return '';
  } , [])

  useEffect(() => {
    const subscription = watch( (value , {name}) => {
      if (name === 'title') {
        setValue('slug' , slugTransform(value.title) , {shouldValidate : true})
      }
    })

    return () => {
      subscription.unsubscribe() // stops watching
    }
  }, [watch , slugTransform , setValue])
  

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-8 bg-white
    rounded-2xl p-8 border border-slate-200 shadow-md">
      <div className="flex-1 space-y-6">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-0"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-0"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <div className='mb-0'>
              <TextEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            
      </div>
            <div className="flex flex-col gap-6 lg:w-80">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-0 overflow-hidden rounded-xl">
                        <img
                            src={databaseService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl border border-slate-200
                             shadow-sm w-full h-48 object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full cursor-pointer">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
    </form>
  )
}

export default PostForm