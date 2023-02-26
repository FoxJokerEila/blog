import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react'
import { postBlog, upload } from '@/services/blog';
import useUser from '@/hooks/useUser';

import styles from './index.module.less'


type IProps = any

export type NewBlogType = {
  title: string,
  content: string
  createTime: number,
  author: string,
  userId: number,
  tags: string
}

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const BlogEdit: React.FC<IProps> = function () {
  const [title, setTitle] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')
  const editorRef = React.useRef<Editor['editor'] | any>(null)
  const navigate = useNavigate()
  const { userInfo } = useUser()

  const create = () => {
    if (editorRef.current) {
      console.log(editorRef.current?.getContent());
      postBlog({
        title: title,
        content: editorRef.current.getContent(),
        author: userInfo.username,
        createTime: new Date().getTime(),
        userId: userInfo.userId,
        tags: '',
      }).then(res => {
        console.log(res);
        if (res?.data.code === 0) {
          navigate('/blog-read?blogId=' + res?.data.blogId)
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

  const handleChange = (e: any) => {
    setTitle(e.target.value)
  }

  return <div style={{ height: '100%' }}>

    <div>
      <div className={styles.titleAndBtn}>
        <Button className={styles.backBtn} onClick={() => navigate(-1)}>返回</Button>
        <Input onChange={handleChange} placeholder="博客标题" />
        <Button type='primary' onClick={create} className={styles.postBtn}>发布</Button>
      </div>

      <div className={styles.tagsAndBtn}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          className={styles.tags}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'tom',
              label: 'Tom',
            },
          ]} />
      </div>


    </div>
    <div className={styles.content}>
      <div className={styles.editor}>
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          tinymceScriptSrc={'/tinymce/js/tinymce/tinymce.min.js'}
          apiKey='8zlimkzi3k0orq35s4mro8mpbzmre9pm4tbu3yoryqenkeir'
          init={{
            language: 'zh-Hans',
            // language_url: '/tinymce/js/tinymce/langs/zh_CN.js',
            height: 'calc(100vh - 162px)',
            resize: false,
            menubar: false,
            plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
            editimage_cors_hosts: ['picsum.photos'],
            images_upload_handler: async function (blobInfo: any, progress: any) {
              let form = new FormData();
              console.log({ blobInfo });
              console.log(blobInfo.blob(), blobInfo.filename());

              form.set('file', blobInfo.blob(), blobInfo.filename())
              // console.log({ form });

              let res = await upload(form)
              console.log({ res });
              return Promise.resolve('localhost:3001/')

            },
            toolbar_mode: 'sliding',
            toolbar_sticky: true,
            toolbar: 'undo redo bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image media template link | fontfamily fontsize blocks | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile anchor codesample | ltr rtl',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
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
