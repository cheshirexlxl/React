import { useCallback } from "react"
import { filesApi } from "../apis/files"

export const useFileDownload = () => {

    const download = useCallback(async (fileId, fileName) => {
        try {
            const response = await filesApi.download(fileId)
            // <a href="URL" download="파일명"></a> => 다운로드 기능 사용
            // 다운로드 가능한 a 태그 클릭
            const url = URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            // 해제
            link.parentNode.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            
        }

    }, [])

    return { download }
}