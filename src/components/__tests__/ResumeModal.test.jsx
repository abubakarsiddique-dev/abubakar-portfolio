import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import ResumeModal from '../ResumeModal';
import { profileData } from '../../data/profile';

describe('ResumeModal Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<ResumeModal isOpen={false} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal dialog with developer name, title, and key resume sections when isOpen is true', () => {
    render(<ResumeModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: profileData.name })).toBeInTheDocument();
    expect(screen.getByText(profileData.title)).toBeInTheDocument();
    expect(screen.getByText('Developer Curriculum Vitae')).toBeInTheDocument();
    expect(screen.getByText('Technical Stack')).toBeInTheDocument();
    expect(screen.getByText('Engineering Experience')).toBeInTheDocument();
    expect(screen.getByText('Featured Mobile Applications')).toBeInTheDocument();
  });

  it('calls onClose when the modal close button is clicked', () => {
    const handleClose = vi.fn();
    render(<ResumeModal isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /Close Resume Modal/i });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside on the modal backdrop', () => {
    const handleClose = vi.fn();
    render(<ResumeModal isOpen={true} onClose={handleClose} />);

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<ResumeModal isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('copies email to clipboard and provides feedback on Copy Email button click', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<ResumeModal isOpen={true} onClose={vi.fn()} />);

    const copyBtn = screen.getByRole('button', { name: /Copy email address/i });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith(profileData.email);
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('calls window.print when Print / Save PDF button is clicked', () => {
    const printMock = vi.fn();
    window.print = printMock;

    render(<ResumeModal isOpen={true} onClose={vi.fn()} />);

    const printBtn = screen.getByRole('button', { name: /Print or save resume as PDF/i });
    fireEvent.click(printBtn);

    expect(printMock).toHaveBeenCalledTimes(1);
  });
});
