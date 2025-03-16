// Mock attachment class that doesn't rely on fs
export class Attachment {
  filename: string;
  content: string;
  type?: string;
  disposition?: string;
  contentId?: string;

  constructor(options: {
    filename: string;
    content: string;
    type?: string;
    disposition?: string;
    contentId?: string;
  }) {
    this.filename = options.filename;
    this.content = options.content;
    this.type = options.type;
    this.disposition = options.disposition;
    this.contentId = options.contentId;
  }

  toJSON() {
    return {
      filename: this.filename,
      content: this.content,
      type: this.type,
      disposition: this.disposition,
      content_id: this.contentId,
    };
  }
}
