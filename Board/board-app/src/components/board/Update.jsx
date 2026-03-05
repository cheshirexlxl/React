import React, { use, useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ImageIcon, Trash2, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import useBoard from '../../hooks/useBoard'
import { useForm } from 'react-hook-form'
import { useBoardMutations } from '../../hooks/useBoardMutations'
import { filesApi } from '../../apis/files'
import FileItem from '../common/FileItem'
import { useFileDownload } from '../../hooks/useFileDownload'
import Swal from 'sweetalert2'
import { formatDate } from '../../utiles/format'

// CKEditor 이미지 업로드 플러그인
function uploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => ({
        upload: async () => {
            const file = await loader.file
            const formData = new FormData()
            formData.append('pId', '')
            formData.append('type', 'SUB')
            formData.append('data', file)
            const res = 
                await filesApi.upload(formData, {'Content-Type' : 'multipart/form-data'})
            return { default: `/api/files/img/${res.data.id}` }
        },
        abort: () => {},
    })
}

const Update = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { board, fileList, isLoading } = useBoard(id)
  const contentRef = useRef('')
  const [editorReady, setEditorReady] = useState(false)
  const { download } = useFileDownload()
  const [checkedFiles, setCheckedFiles] = useState([])

  // 🧊 메인 파일 state
  const fileInputRef = useRef(null)
  const [mainFile, setMainFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(null)

  const {
    register, handleSubmit, reset, formState: { errors }
  } = useForm()

  const { updateBoard, deleteFile, deleteFiles, isDeleting } = useBoardMutations(id)

  const onSubmit = (data) => {    
    // updateBoard(
    //     { id: id, title: data.title, writer: data.writer, content: contentRef.current },
    //     { 'Content-Type': 'application/json' }
    // )
    const formData = new FormData()
    formData.append('id', id)
    formData.append('title', data.title)
    formData.append('writer', data.writer)
    formData.append('content', contentRef.current)

    // 메인 파일
    if( mainFile ) formData.append('mainFile', mainFile)
    // 첨부 파일
    if( data.files?.length ) {
        Array.from(data.files).forEach((f) => formData.append('files', f))
    }   
    updateBoard(formData, { 'Content-Type': 'multipart/form-data' })
  }

  // 파일 선택 & 드롭 처리
  const handleMainFile = (file) => {
    // 이미지 파일인지 확인
    if( !file || !file.type.startsWith('image/') ) return
    setMainFile(file)
    // 이미지 미리보기
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  // 메인 파일 제거
  const clearMainFile = () => {
    setMainFile(null)
    setPreview(null)
    if( fileInputRef.current ) fileInputRef.current.value = ''
  }

  // 드래그 이벤트
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false) }
  const handleDrop = (e) => { 
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if( file ) handleMainFile(file)
  }

  const handleFileCheck = (fileId, checked) => {
    setCheckedFiles((prev) => 
        checked ? [...prev, fileId] : prev.filter( (f) => f !== fileId )
    )    
  }

  const handleDeleteChecked = async () => {
    if( checkedFiles.length === 0 ) return
    const result = await Swal.fire({
        title: `선택한 ${checkedFiles.length}개의 파일을 삭제하시겠습니까?`,
        text: '삭제한 파일은 되돌릴 수 없습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280'
    })
    if( result.isConfirmed ) {
        deleteFiles(checkedFiles)
        setCheckedFiles([])
    }
  }  

  // 기존 데이터 초기화
  useEffect(() => {
    if( board ) {
        reset({ title: board.title, writer: board.writer })
        contentRef.current = board.content || ''
        setEditorReady(true)
    }
  }, [board, reset])

  const inputClass =
    `w-full px-3 py-2 text-sm border border-gray-200 rounded outline-none
     focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-white
    `
    
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center mb-5">
            <h1 className="text-xl font-semibold text-gray-900 text-center">글수정</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {/* 제목 */}
            <div className="flex items-start gap-4 px-5 py-4">
                <label className="w-20 flex-shrink-0 text-sm font-medium text-gray-600 pt-2">
                    제목 <span className="text-red-400">*</span>
                </label>
                <div className="flex-1">
                    <input 
                        {...register('title', { required: '제목을 입력해주세요.' })}
                        placeholder='제목을 입력해주세요'
                        className={inputClass}
                    />
                    {
                        errors.title && (
                            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
                        )
                    }
                </div>
            </div>

            {/* 작성자 */}
            <div className="flex items-start gap-4 px-5 py-4">
                <label className="w-20 flex-shrink-0 text-sm font-medium text-gray-600 pt-2">
                    작성자 <span className="text-red-400">*</span>
                </label>
                <div className="flex-1">
                    <input 
                        {...register('writer', { required: '작성자를 입력해주세요.' })}
                        placeholder='작성자를 입력해주세요'
                        className={inputClass}
                    />
                    {
                        errors.writer && (
                            <p className="mt-1 text-xs text-red-500">{errors.writer.message}</p>
                        )
                    }
                </div>
            </div>

            {/* 내용 */}
            <div className="px-5 py-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    내용
                </label>
                {editorReady && (
                    <CKEditor 
                        editor={ClassicEditor}
                        data={contentRef.current}
                        config={{
                            extraPlugins: [uploadAdapterPlugin],
                            toolbar: [
                                'undo', 'redo', '|',
                                'heading', '|',
                                'bold', 'italic', 'underline', 'strikethrough', '|',
                                'bulletedList', 'numberedList', '|',
                                'link', 'imageUpload', 'mediaEmbed', '|',
                                'blockQuote', 'code',
                            ],
                        }}  
                        onChange={(_, editor) => {
                            contentRef.current = editor.getData()
                        }}
                    />
                )}
            </div>

            {/* 첨부 파일 */}
            {
                fileList.length > 0 && (
                    <div className="px-5 py-4">

                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-700">
                                첨부 파일 ({fileList.length})
                            </h3>
                            <button
                                type='button'
                                className='inline-flex items-center gap-1 px-3 py-1.5 text-xs
                                           font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors'
                                onClick={handleDeleteChecked}
                            >
                                <Trash2 size={13} />
                                선택 삭제 ({checkedFiles.length})
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {
                                fileList.map((file) => (
                                    <FileItem 
                                        Key={file.id}
                                        file={file}
                                        onDownload={download}
                                        selectable
                                        onDelete={
                                            async (fileId) => {
                                                const result = await Swal.fire({
                                                    title: '파일을 삭제하시겠습니까?',
                                                    text: '파일을 삭제하면 되돌릴 수 없습니다.',
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonText: '삭제',
                                                    cancelButtonText: '취소',
                                                    confirmButtonColor: '#ef4444',
                                                    cancelButtonColor: '#6b7280',
                                                })
                                                if( result.isConfirmed ) {
                                                    deleteFile(fileId)
                                                }
                                            }
                                        }
                                        onCheck={handleFileCheck}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {/* 메인 파일 업로드 영역 */}
            <div className="flex items-start gap-4 px-5 py-4">
                <label className="w-20 flex-shrink-0 text-sm font-medium text-gray-600 pt-2">
                    메인 파일
                </label>

                <div className="flex-1">
                    {
                        preview ? (
                            /* 미리보기 */
                            <div className="relative inline-block">
                                <img src={preview} alt="미리보기" 
                                    className="w-48 h-32 object-cover rounded-lg border border-gray-200" />
                                <button
                                    type='button'
                                    onClick={clearMainFile}
                                    aria-label='이미지 삭제'
                                    className='absolute -top-2 -right-2 w-5 h-5 bg-gray-700 text-white
                                        flex items-center justify-center hover:bg-gray-900 transition-colors cursor-pointer'
                                >
                                    <X size={11} />
                                </button>
                            </div>
                        ) : (
                            /* 드래그앤드랍 존 */
                            <div 
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                                    w-full h-28 border-2 border-dashed 
                                    flex flex-col items-center justify-center
                                    gap-1 cursor-pointer transition-colors select-none
                                    ${isDragging 
                                        ? 'border-blue-400 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                    }
                                `}>
                                <ImageIcon size={22} className={isDragging ? 'text-blue-400' : 'text-gray-300'} />                       
                                <span className="text-xs text-gray-400">
                                    클릭하거나 파일을 드래그하세요
                                </span>
                                <span className="text-xs text-gray-300">
                                    JPG, PNG, GIF, WEBP
                                </span>
                            </div>
                        )
                    }
                    {/* 파일 입력 */}
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept='image/*' 
                        className='hidden' 
                        onChange={(e) => handleMainFile(e.target.files?.[0])}
                    />
                </div>
            </div>

            {/* 첨부 파일 업로드 영역 */}
            <div className="flex items-center gap-4 px-5 py-4">
                <label className='w-20 flex-shriink-0 text-sm font-medium text-gray-600'>
                    첨부 파일
                </label>
                <input type="file" multiple 
                    {...register('files')}
                    className='flex-1 text-sm text-gray-600 file:mr-3 file:py-1.5 file:rounded-md
                        file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-600
                        hover:file:bg-gray-200 cursor-pointer
                    '
                />
            </div>
        </div>

        {/* 버튼 */}
        <div className="flex items-center justify-between gap-2 mt-6 mb-6">
            <button
                type='button'
                className='px-4 py-2 w-full text-sm font-medium text-gray-700 bg-white border border-gray-200
                           rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                onClick={() => navigate('/boards')}
            >
                취소
            </button>
            <button
                type='submit'
                className='px-4 py-2 w-full text-sm font-medium text-white bg-blue-500
                           rounded-lg hover:bg-blue-600 transition-colors cursor-pointer'
            >
                저장
            </button>
        </div>

    </form>
  )
}

export default Update