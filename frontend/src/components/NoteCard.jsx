import React from 'react';
import { Link } from 'react-router-dom';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils';

const NoteCard = ({note}) => {
  return (
    <div className='card hover:shadow-lg transition-all duration-200'>
      <Link to={`/note/${note._id}`} className='card-body block'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
      </Link>
      <div className='card-actions justify-between items-center mt-2 px-4 pb-4'>
        <span className='text-sm text-base-content/60'>
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className='flex items-center gap-2'>
          <Link to={`/note/edit/${note._id}`}>
            <PenSquareIcon className='size-4' />
          </Link>
          <button className='btn btn-ghost btn-xs text-error'>
            <Trash2Icon className='size-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
