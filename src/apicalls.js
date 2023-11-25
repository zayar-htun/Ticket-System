import request from "superagent";

const api = "https://dev.gigagates.com/market-hub-backend/";
const token = "60e1bea6-08f9-4c78-979d-c479437b55eb";

export async function getallticket() {
    const res = await fetch(`${api}/v1/ticket/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const result = await res.json();
        return result;
    }
    return false;
}

export async function getAllPriority() {
    const res = await fetch(`${api}/v1/ticket/priority/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;

    const priority = await res.json();
    return priority;
}

export async function getAllCategory() {
    const res = await fetch(`${api}/v1/ticket/category/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;

    const category = await res.json();
    return category;
}

export async function getUploadTicket(
    title,
    description,
    category,
    priority,
    uploadData
) {
    const res = await fetch(`${api}/v1/ticket/createTicketForm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: title,
            description: description,
            imageGuid: uploadData,
            categoryGuid: category,
            priorityGuid: priority,
        }),
    });

    if (!res.ok) return false;

    const ticket = await res.json();
    return ticket;
}

export async function getUploadFile(file) {
    console.log(file);
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await request
            .post(`${api}/v1/files/upload`)
            .attach("file", file)
            .then(response => response);

        if (!response.ok) {
            throw new Error(
                `File upload failed with status ${response.status}`
            );
        }

        // Access the response body directly
        const category = response.body.data; // Adjust this line based on the actual structure of your response

        console.log(category);
        return category;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Re-throw the error for further handling
    }
}

export async function getTicketDetail(id) {
    const res = await fetch(`${api}v1/ticket/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;

    const users = await res.json();
    return users;
}

export async function getUploadComment(ticketGuid, description, imageGuid) {
    const res = await fetch(`${api}v1/ticket/comment/createTicketComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            ticketGuid: ticketGuid,
            description: description,
            imageGuid: imageGuid,
        }),
    });
    if (!res.ok) return false;

    const priority = await res.json();
    return priority;
}

export async function getAssignUser() {
    const res = await fetch(`${api}v1/ticket/assign/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;

    const category = await res.json();
    return category;
}

export async function getTransferUser(ticketGuid, ticketAssignGuid) {
    const res = await fetch(`${api}v1/ticket/comment/createTicketComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            ticketGuid: ticketGuid,
            ticketAssignGuid: ticketAssignGuid,
        }),
    });
    if (!res.ok) return false;

    const transfer = await res.json();
    return transfer;
}

export async function updateCategory(guid, name) {
    const res = await fetch(`${api}v1/ticket/category/update/${guid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name, prefix: "abc" }),
    });

    if (!res.ok) return false;

    const transfer = await res.json();
    return transfer;
}

export async function createCategory(name, prefix) {
    const res = await fetch(`${api}v1/ticket/category/createTicketCategory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name, prefix: prefix }),
    });

    if (!res.ok) return false;

    const transfer = await res.json();
    return transfer;
}

export async function getAllAssign() {
    const res = await fetch(`${api}/v1/ticket/assign/listAssign`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;

    const assign = await res.json();
    return assign;
}

export async function getAllPerson() {
    const res = await fetch(`${api}/v1/person/list_by_role`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;

    const person = await res.json();
    return person;
}

export async function updateAssign(assignGuid, categoryGuid, personGuid) {
    const res = await fetch(`${api}v1/ticket/assign/update/${assignGuid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            categoryGuid: categoryGuid,
            personGuid: personGuid,
        }),
    });

    if (!res.ok) return false;

    const transfer = await res.json();
    return transfer;
}

export async function createAssign(categoryGuid, personGuid) {
    const res = await fetch(`${api}v1/ticket/assign/createTicketAssign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            categoryGuid: categoryGuid,
            personGuid: personGuid,
        }),
    });

    if (!res.ok) return false;

    const transfer = await res.json();
    return transfer;
}

export async function deleteAssign(guid) {
    const res = await fetch(`${api}v1/ticket/assign/delete/${guid}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return false;

    const transfer = await res.json();
    return transfer;
}
