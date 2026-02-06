interface AssetCardProps {
  fileName: string;
  fileType: 'image' | 'gif' | 'video' | 'document';
  thumbnailUrl: string;
}

const fileTypeColors = {
  image: 'bg-black',
  gif: 'bg-black',
  video: 'bg-black',
  document: 'bg-black',
};

const fileTypeLabels = {
  image: 'Image',
  gif: 'GIF',
  video: 'Video',
  document: 'Document',
};

export function AssetCard({ fileName, fileType, thumbnailUrl }: AssetCardProps) {
  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 cursor-pointer transition-colors flex-1 min-w-[160px] max-w-[200px] md:min-w-[234px] md:max-w-[248px] basis-[calc(50%-5px)] md:basis-auto">
      {/* Thumbnail Container */}
      <div className="relative aspect-[234/160] bg-gray-100">
        <img 
          src={thumbnailUrl} 
          alt={fileName}
          className="w-full h-full object-cover"
        />
        {/* File Type Tag - Desktop */}
        <div className={`hidden md:block absolute top-[15px] right-[15px] ${fileTypeColors[fileType]} text-white text-xs font-medium px-2 py-1 rounded`}>
          {fileTypeLabels[fileType]}
        </div>
        {/* File Type Tag - Mobile */}
        <div className={`md:hidden absolute top-[10px] right-[10px] ${fileTypeColors[fileType]} text-white text-xs font-medium px-2 py-1 rounded`}>
          {fileTypeLabels[fileType]}
        </div>
      </div>
      
      {/* File Name - Desktop */}
      <div className="hidden md:block p-[15px]">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {fileName}
        </p>
      </div>
      
      {/* File Name - Mobile */}
      <div className="md:hidden p-[10px]">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {fileName}
        </p>
      </div>
    </div>
  );
}
