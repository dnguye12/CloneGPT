"use client"

import { Attachment, AttachmentPreview, AttachmentRemove, Attachments } from "@/components/ai-elements/attachments";
import { usePromptInputAttachments } from "@/components/ai-elements/prompt-input";

const HomeInputAttachmentsDisplay = () => {
    const attachments = usePromptInputAttachments()

    if (attachments.files.length === 0) {
        return null
    }

    return (
        <Attachments>
            {attachments.files.map((attachment) => (
                <Attachment
                    key={attachment.id}
                    data={attachment}
                    onRemove={() => attachments.remove(attachment.id)}
                >
                    <AttachmentPreview />
                    <AttachmentRemove />
                </Attachment>
            ))}
        </Attachments>
    );
}

export default HomeInputAttachmentsDisplay;