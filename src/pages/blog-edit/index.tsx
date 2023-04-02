import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Spin } from 'antd';
import { Editor } from '@tinymce/tinymce-react'
import { getBlog, getTags, postBlog, updateBlog, upload } from '@/services/blog';
import useUser from '@/hooks/useUser';

import styles from './index.module.less'
import useSearch from '@/hooks/useSearch';


type IProps = any

export type NewBlogType = {
  title: string,
  content: string
  author: string,
  user_id: number,
  tags: string,
}

export type CommentType = {
  content: string
  blog_id: number
  id?: number
  user_id?: number
  secondary_id?: string
  commented_user_id?: number
  username?: string
  commented_username?: string
  create_time?: string
  parent_level_id?: number
  target_comment_id?: string
  comment_privacy_level?: number
  secondary_comments?: CommentType[]
}

const onSearch = (value: string) => {
  console.log('search:', value);
};

const BlogEdit: React.FC<IProps> = function () {
  const [title, setTitle] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')
  const [initCon, setInitCon] = React.useState<string>('')
  const [tags, setTags] = React.useState<any[]>([])
  const [selectedTags, setSelected] = React.useState<string | number[] | undefined>()
  const [visible, setVisible] = React.useState<boolean>(false)
  const editorRef = React.useRef<Editor['editor'] | any>(null)
  const navigate = useNavigate()
  const { userInfo } = useUser()
  const { searchFinder } = useSearch()

  const create = () => {
    if (editorRef.current) {

      const data = {
        title: title,
        content: editorRef.current.getContent(),
        author: userInfo.username,
        user_id: userInfo.user_id,
        tags: typeof selectedTags === 'string' ? selectedTags : selectedTags?.join(',') || '',
      }
      if (searchFinder('blog_id')) {
        updateBlog(data).then(res => {
          if (res?.code === 0) {
            navigate('/blog-read?blog_id=' + res?.blogId)
          }
        }).catch(err => {
          console.log(err);
        })
      } else {
        postBlog(data).then(res => {
          if (res?.code === 0) {
            navigate('/blog-read?blog_id=' + res?.blogId)
          }
        }).catch(err => {
          console.log(err);
        })
      }

    }
  }

  const handleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const onChange = (value: string) => {
    setSelected(value)
  };

  React.useEffect(() => {
    getTags().then((res) => {
      setTags(res.list)
    })
  }, [])

  React.useEffect(() => {
    const blog_id = searchFinder('blog_id')
    if (blog_id && tags.length) {
      getBlog(Number(blog_id)).then((res) => {
        if (res.code === 0) {
          const blog = res.blog
          setInitCon(() => blog.content)
          setContent(() => blog.content)
          setTitle(() => blog.title)
          setSelected(() => blog.tags.split(',').map(Number))
        }
      })
    }
  }, [searchFinder, tags])

  return <div style={{ height: '100%' }}>

    <div>
      <div className={styles.titleAndBtn}>
        <Button className={styles.backBtn} onClick={() => navigate(-1)}>返回</Button>
        <Input onChange={handleChange} value={title} placeholder="博客标题" />
        <Button type='primary' onClick={create} className={styles.postBtn}>发布</Button>
      </div>

      <div className={styles.tagsAndBtn}>
        <Select
          fieldNames={{ label: 'name', value: 'id' }}
          mode="multiple"
          showSearch
          allowClear
          className={styles.tags}
          placeholder="选择标签"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          value={selectedTags as string}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={tags} />
      </div>


    </div>
    <div className={styles.content}>
      {!visible && <div className={styles.spin}><Spin /></div>}
      <div className={styles.editor} style={visible ?
        {
          visibility: 'visible',
          width: '49.8%'
        } :
        {
          width: 0,
          visibility: 'hidden',
        }}>
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={initCon}
          tinymceScriptSrc={'/tinymce/js/tinymce/tinymce.min.js'}
          apiKey='8zlimkzi3k0orq35s4mro8mpbzmre9pm4tbu3yoryqenkeir'
          init={{
            language: 'zh-Hans',
            height: 'calc(100vh - 92px)',
            resize: false,
            menubar: false,
            plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons',
            editimage_cors_hosts: ['picsum.photos'],
            images_upload_handler: async function (blobInfo: any, progress: any) {
              let form = new FormData();

              form.set('file', blobInfo.blob(), blobInfo.filename())
              let res = await upload(form)

              return Promise.resolve('http://localhost:3001/' + res?.img_path)

            },
            toolbar_mode: 'sliding',
            toolbar_sticky: true,
            toolbar: 'undo redo bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image media template link | fontfamily fontsize blocks | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile anchor codesample | ltr rtl',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            init_instance_callback: function (editor) {
              console.log("ID为: " + editor.id + " 的编辑器已初始化完成.");
              setVisible(true)
            }
          }}
          onEditorChange={(str) => {
            setContent(str)
          }}
        />
      </div>
      <div className={styles.shower} dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>


  </div >
}

export default BlogEdit
