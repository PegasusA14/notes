export interface AuthResponseDto {
    token: string;
    name: string;
    email: string;
}

export interface FolderResponseDto {
    id: number;
    name: string;
    createdAt: string;
    noteCount: number;
}

export interface NoteResponseDto {
    id: number;
    title: string;
    content: string;
    folderId: number | null;
    folderName: string | null;
    createdAt: string;
    updatedAt: string | null;
}

export interface NoteDto {
    title: string;
    content: string;
    folderId: number | null;
}

export interface FolderDto {
    name: string;
}
