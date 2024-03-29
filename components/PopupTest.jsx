'use client'
import React, {useEffect} from "react";
import { TextField } from "@mui/material"
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
    Typography, IconButton, Avatar, Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2";

const PopupInputtest = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState('');
    const [persons, setPersons] = useState(
            props.keyContactsRec?.map((contact) => ({
            id: contact.user_id,
            name: `${contact.first_name} ${contact.last_name}`,
            designation: contact.designation_title,
            image: contact.user_profile_photo ? contact.user_profile_photo : '/avatar.jpg',
        }))
    );

    
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };


    const handlePersonSelect = (person) => {
        setSelectedPerson(person);
        handleModalClose();
        props.setPersonAssignTo(person)
        console.log('Selected Person:', person);

    };
    const open = Boolean(anchorEl);

    return (
        <div className={`flex items-center bg-white relative ${props.className}`}>       
            <TextField
                variant="outlined"
                label={props.label}
                value={selectedPerson ? selectedPerson.name : ''}
                className="w-full  pointer-events-none"
                InputProps={{
                    readOnly: true,
                }}
            />
            <IconButton onClick={handleModalOpen} className="right-4 " style={{position:'absolute'}}>
                <Image src="/add-blue.svg" width={18} height={21} />
            </IconButton>
            <Dialog open={isModalOpen} onClose={handleModalClose} >
                <div className="p-4 w-[600px]">
                    <DialogTitle className="text-center font-medium text-[26px] mb-4">Select Contact</DialogTitle>
                    <DialogContent>
                        <div className="">
                            <div className="px-7 py-3 text-[#778CA2] bg-[#F3F5F6]" >Select Contact</div>
                            <div className="bg-[#F8FAFB] px-7 py-3">
                                {/* List of Persons */}
                                {persons?.map((person) => (
                                    <div className="flex justify-between w-full bg-white mb-2 px-2 py-1" key={person.id}>
                                        <div className="flex flex-[1] border border-[#E8ECEF] rounded-3xl items-center px-1">
                                            <Avatar className="mr-2">
                                                <Image src="/man.jpeg" width={38} height={38} />
                                            </Avatar>
                                            <div className="">
                                                <Typography variant="subtitle1" className="font-medium">{person.name}</Typography>
                                                <Typography variant="body2" className="text-[#778CA2]">{person.designation}</Typography>
                                            </div>
                                            {/*<div className="ml-auto py-0.5 px-[10px] text-[10px] bg-[#FE4D9745] text-[#FE4D97] mr-3">E</div>*/}
                                        </div>
                                        <div className="flex flex-[1] items-center justify-between px-2">
                                            <div className="">{/*<HiOutlineTrash className="text-[#778CA2]" />*/}</div>
                                            <div className=""><IoIosAddCircleOutline className="text-[#26BADA] cursor-pointer" onClick={() => handlePersonSelect(person)} /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose}>Cancel</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default PopupInputtest