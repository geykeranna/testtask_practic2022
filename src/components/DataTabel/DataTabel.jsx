import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { ContextMenu } from 'primereact/contextmenu';
import { Column } from 'primereact/column';
import { DataService } from '../../DataService'
import { Toast } from "primereact";
import { filters } from "./consts/consts";


const DataTableMain = () => {
    const [userList, setUserList] = useState([]);
    const contextMenuModel = [
        {label: "Редактировать", icon: 'pi pi-fw pi-pencil', command: () => editUser(selectedUser)},
        {label: "Удалить", icon: 'pi pi-fw pi-minus', command: () => deleteUser(selectedUser)}
    ];
    const [selectedUser, setSelectedUser] = useState([]);
    const toast = useRef(null);
    const cm = useRef(null);
    const [loading, setLoading] = useState(true);
    const dataService = new DataService();

    useEffect( () => {
        loadUser()
    }, []);

    const loadUser = async() => {
        const userList = await dataService.getDataset();
        if (userList) {
            setUserList(userList);
            toast.current.show({severity: 'success',
                summary: 'Получение списка пользователей',
                detail: 'Данные пользователей успешно получены'});
        } else {
            toast.current.show({severity: 'error',
                summary: 'Получение списка пользователей',
                detail: 'Данные пользователей не были получены'});
        }
        setLoading(false)
    }

    const editUser = (user) => {
        toast.current.show({severity: 'info', summary: 'User want to be edit, but not now', detail: user.name});
    }

    const deleteUser = async (user) => {
        const status = await dataService.deleteDataset(user.id);
        if(status) {
            const newList = userList.filter((u) => u.id !== user.id);
            setUserList(newList);
            toast.current.show({
                severity: 'error', summary: 'Удаление пользователя',
                detail: `Пользователь ${user.first_name} ${user.last_name} был удален.`
            });
        } else {
            toast.current.show({
                severity: 'error', summary: 'Удаление пользователя',
                detail: `Произошли технические шоколадки. Пользователь ${user.first_name} ${user.last_name} не был удален.`
            });
        }
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-start">
                <h1>Таблица пользователей</h1>
            </div>
        )
    }

    return (
        <div>
            <ContextMenu model={ contextMenuModel } ref={cm} onHide={() => setSelectedUser(null)}/>
            <div className="card">
                <DataTable
                    value={ userList }
                    contextMenuSelection={ selectedUser }
                    onContextMenuSelectionChange={e => setSelectedUser(e.value)}
                    onContextMenu={e => cm.current.show(e.originalEvent)}
                    responsiveLayout="scroll"
                    showGridlines
                    emptyMessage="Данные не были найдены"
                    filters={ filters }
                    filterDisplay="row"
                    loading={ loading }
                    header={ renderHeader() }
                >
                    <Column field="id"
                            header="ID"
                            sortable
                            filter
                            filterPlaceholder="Поиск по id"
                    ></Column>
                    <Column field="email"
                            header="Email"
                            sortable
                            filter
                            filterPlaceholder="Поиск по мейлу"
                    ></Column>
                    <Column field="first_name"
                            header="First Name"
                            sortable
                            filter
                            filterPlaceholder="Поиск по имени"
                    ></Column>
                    <Column field="last_name"
                            header="Last Name"
                            sortable
                            filter
                            filterPlaceholder="Поиск по фамилии"
                    ></Column>
                </DataTable>
            </div>
            <Toast ref={toast}></Toast>
        </div>
    );
}

export default DataTableMain;
